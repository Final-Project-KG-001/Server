class AppointmentController {
  static async write(req, res, next) {
    try {
      const { doctorId, queueNumber } = req.body;
      const collection = req.appointmentCollection;

      if (doctorId !== "" && doctorId !== null) {
        const newAppointment = await collection.insertOne({
          userId: req.currentUser._id,
          doctorId: doctorId,
          queueNumber: queueNumber, // handle di client
          status: "waiting", //waiting & done
        });

        const {
          userId,
          doctorId: doctor,
          queueNumber: number,
        } = newAppointment.ops[0];
        res.status(201).json({
          message: "successfully created new queue",
          userId: userId,
          doctorId: doctor,
          queueNumber: number,
        });
      } else {
        next({ name: "400 Bad Request", error: "Doctor ID cannot be empty!" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const collection = req.appointmentCollection;
      const appointments = await collection.find().toArray();

      res.status(200).json({ appointments });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AppointmentController;
