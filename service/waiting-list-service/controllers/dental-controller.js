const { ObjectId } = require("mongodb");

class DentalController {
    
    static async getDentalRootHandler(req, res , next) {
        const Dental = req.dentalCollection;

        try {
            const dentals = await Dental.aggregate([
                {
                    $lookup:
                    {
                        from: "appointments",
                        let: { appointmentId: "$appointmentId" },
                        pipeline: [
                            { $match: 
                                { $expr: 
                                    { $and: 
                                        [
                                            { $eq: ["$_id", "$$appointmentId"] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'appointment'
                    }
                }
            ]).toArray();
            
            res.status(200).json(dentals);
        } catch (error) {
            next(error);
        }
    }

    static async postDentalRootHandler(req, res, next) {
        const Dental = req.dentalCollection;
        
        const { appointmentId } = req.body;

        const newQueue = {
            appointmentId: ObjectId(appointmentId)
        };

        try {
            const result = await Dental.insertOne(newQueue);

            res.status(201).json({status: '201 Created', message: 'Appointment have successfully added to queue'});
        } catch (error) {
            next(error);
        }
    }

    static async deleteDentalByIdHandler(req, res, next) {
        let dentalId = req.params.id;

        const Dental = req.dentalCollection;
        try {
            if(!dentalId) {
                next({
                   name: '404 Not Found',
                   error: {
                       message: 'Appointment not found'
                   } 
                });
            } else {
                dentalId = ObjectId(dentalId);

                await Dental.deleteOne(
                    { _id: dentalId}
                );

                res.status(200).json({status: '200 OK', message: 'Appointment have successfully removed from queue'});
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = DentalController;