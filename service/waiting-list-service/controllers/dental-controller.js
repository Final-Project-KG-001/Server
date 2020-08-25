const { ObjectId, ObjectID } = require("mongodb");

class DentalController {
  static async getDentalRootHandler(req, res, next) {
    const Dental = req.dentalCollection;

    try {
      const dentals = await Dental.aggregate([
        {
          $lookup: {
            from: "appointments",
            let: { appointmentId: "$appointmentId" },
            pipeline: [
              {
                $match: {
                  $expr: { $and: [{ $eq: ["$_id", "$$appointmentId"] }] },
                },
              },
            ],
            as: "appointment",
          },
        },
      ]).toArray();

      res.status(200).json(dentals);
    } catch (error) {
      next(error);
    }
  }

  static async postDentalRootHandler(req, res, next) {
    const Dental = req.dentalCollection;
    const Appointment = req.appointmentCollection;

    const { appointmentId } = req.body;

    const newQueue = {
      appointmentId: ObjectId(appointmentId),
    };

    try {
      const result = await Dental.insertOne(newQueue);
      const responseData = result.ops[0];
      const appointment = await Appointment.findOne({
        _id: responseData.appointmentId,
      });
      responseData.status = "201 Created";
      responseData.message = "Appointment have successfully added to queue";
      responseData.appointment = [appointment];
      res.status(201).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  static async deleteDentalByIdHandler(req, res, next) {
    try {
      const dentalId = req.params.id;
      const Dental = req.dentalCollection;

      // if(!dentalId) {
      //     next({
      //        name: '404 Not Found',
      //        error: {
      //            message: 'Appointment not found'
      //        }
      //     });
      // } else {
      //     dentalId = ObjectId(dentalId);

      //     await Dental.deleteOne(
      //         { _id: dentalId}
      //     );

      //     res.status(200).json({status: '200 OK', message: 'Appointment have successfully removed from queue'});
      // }

      if (dentalId !== "" && dentalId !== null) {
        const currentDental = await Dental.findOne({
          _id: ObjectID(dentalId),
        });
        if (currentDental) {
          await Dental.deleteOne({ _id: ObjectID(dentalId) });
          res.status(200).json({
            status: "200 OK",
            message: "Appointment have successfully removed from queue",
          });
        } else {
          next({ name: "404 Not Found", error: "Appointment not found" });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DentalController;
