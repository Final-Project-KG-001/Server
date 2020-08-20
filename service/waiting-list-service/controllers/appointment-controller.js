class AppointmentController {
    static async write(req, res, next) {
        try {
            const { doctorId } = req.body;
            const collection = req.appointmentCollection;
      
            if (doctorId !== "" && doctorId !== null) {
                const newAppointment = await collection.insertOne({
                    userId: req.currentUser._id,
                    doctorId,
                    queueNumber: 1, // increment dari sebelomnya?
                    status: "waiting", //waiting & done
                  });
      
                  const {userId, doctorId: doctor, queueNumber} = newAppointment.ops[0]
                  res.status(201).json({
                    message: "successfully created new queue",
                    userId: userId,
                    doctorId: doctor,
                    queueNumber: queueNumber
                  });
            } else {
                res.status(400).json({message: "Doctor ID cannot be empty!"});
            }
          } catch (error) {
            res.status(500).json(error);
          }
    }

    static async read(req, res, next) {
        try {
            const collection = req.appointmentCollection
            const appointments = await collection.find().toArray()

            res.status(200).json({appointments})
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = AppointmentController