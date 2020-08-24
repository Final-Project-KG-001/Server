const { ObjectID } = require("mongodb");

class AppointmentController {
  static async write(req, res, next) {
    try {
      const { doctorId, queueNumber } = req.body;
      const collection = req.appointmentCollection;
      
      if (doctorId !== "" && doctorId !== null) {
        const newAppointment = await collection.insertOne({
          userId: ObjectID(req.currentUser._id),
          doctorId: ObjectID(doctorId),
          queueNumber: queueNumber, // handle di client
          status: "waiting", //waiting & done
          createdAt: (new Date()).toLocaleString(),
        });
        
        const {
          userId,
          doctorId: doctor,
          queueNumber: number,
          createdAt: create
        } = newAppointment.ops[0];
        res.status(201).json({
          message: "successfully created new queue",
          userId: userId,
          doctorId: doctor,
          queueNumber: number,
          createdAt: create
        });
      } else {
        next({ name: "400 Bad Request", error: "Doctor ID cannot be empty!" });
      }
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const collection = req.appointmentCollection;
      const appointments = await collection.aggregate([
        {
          $lookup:
          {
            from: "doctors",
            let: { doctorId: "$doctorId" },
            pipeline:  [
              { $match: 
                { $expr: 
                  { $and: 
                    [
                      { $eq: ["$_id", "$$doctorId"]}
                    ]
                  }
                }
              }
            ],
            as: 'doctor'
          },
        },
        {
          $lookup:
          {
            from: "users",
            let: { userId: "$userId" },
            pipeline: [
              { $match: 
                { $expr: 
                  { $and: 
                    [
                      { $eq: ["$_id", "$$userId"]}
                    ]
                  }
                }
              }
            ],
            as: 'user'
          }
        }
      ]).toArray();

      res.status(200).json({ appointments: appointments });
    } catch (error) {
      next(error);
    }
  }

  static async changeStatus(req, res, next) {
    try {
      const id = req.params.id;
      const { status } = req.body;
      const collection = req.appointmentCollection;

      if (status !== "" && status !== null) {
        const currentAppointment = await collection.findOne({
          _id: ObjectID(id),
        });
        if (currentAppointment) {
          const updateAppointment = await collection.updateOne(
            { _id: ObjectID(id) },
            {
              $set: {
                status: status,
              },
            }
          );
          res.status(200).json({
            message: "successfully updated appointment",
            status: status,
            appointment: {
              _id: currentAppointment._id,
              userId: currentAppointment.userId,
              doctorId: currentAppointment.doctorId,
              queueNumber: currentAppointment.queueNumber,
              status: status,
            }
          });
        } else {
          next({ name: "404 Not Found", error: "Data not found" });
        }
      } else {
        next({ name: "400 Bad Request", error: "Invalid status" });
      }
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}

module.exports = AppointmentController;
