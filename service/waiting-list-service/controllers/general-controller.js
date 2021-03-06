const { ObjectId } = require("mongodb");
const app = require('../app');

class GeneralController {
    static async getGeneralRootHandler(req, res, next) {
        const General = req.generalCollection;

        try {
            const generals = await General.aggregate([
                {
                    $lookup:
                    {
                        from: "appointments",
                        let: { appointmentId: "$appointmentId" },
                        pipeline: [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                            [
                                                { $eq: [ "$_id", "$$appointmentId" ] }
                                            ]
                                    }
                                }
                            }
                        ],
                        as: 'appointment'
                    }
                }
            ]).toArray();
            // console.log(generals)
            res.status(200).json(generals);
        } catch (error) {
            next(error);
        }
    }

    static async postGeneralRootHandler(req, res, next) {
        const General = req.generalCollection;
        const Appointment = req.appointmentCollection;

        const { appointmentId } = req.body;

        const newQueue = {
            appointmentId: ObjectId(appointmentId)
        };



        try {
            const result = await General.insertOne(newQueue);
            const responseData = result.ops[ 0 ];
            const appointment = await Appointment.findOne(
                { _id: responseData.appointmentId }
            );

            responseData.status = '201 Created';
            responseData.message = 'Appointment have successfully added to queue';
            responseData.appointment = [ appointment ];
            res.status(201).json(responseData);
        } catch (error) {
            next(error);
        }
    }

    static async deleteGeneralByIdHandler(req, res, next) {

        let generalId = req.params.id;

        const General = req.generalCollection;
        try {
            const findOne = await General.findOne({ _id: ObjectId(generalId) })

            if (!findOne) {
                next({
                    name: '404 Not Found',
                    error: 'Appointment not found'
                });
            } else {
                generalId = ObjectId(generalId);

                await General.deleteOne(
                    { _id: generalId }
                );

                res.status(200).json({ status: '200 OK', message: 'Appointment have successfully removed from queue' });
            }
        } catch (error) {

            next(error);
        }
    }
}

module.exports = GeneralController;