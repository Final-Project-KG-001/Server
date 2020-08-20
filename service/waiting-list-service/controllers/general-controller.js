const { getDatabase } = require("../../../../../../Week 2/Day 4/hibur-aku/server/services/movieService/config/connection");
const { ObjectId } = require("mongodb");

class GeneralController {
    static database() {
        return getDatabase().collection('generals');
    }
    
    static async getGeneralRootHandler(req, res , next) {
        try {
            const generals = await this.database().find().toArray();

            res.status(200).json(generals);
        } catch (error) {
            next(error);
        }
    }

    static async postGeneralRootHandler(req, res, next) {
        try {
            const result = await this.database().insertOne(req.body);

            res.status(201).json(result.ops[0]);
        } catch (error) {
            next(error);
        }
    }

    static async deleteGeneralByIdHandler(req, res, next) {
        let generalId = req.params.id;
        try {
            if(!generalId) {
                next({
                   name: '404 Not Found',
                   error: {
                       message: 'Appointment not found'
                   } 
                });
            } else {
                generalId = ObjectId(generalId);

                await this.database().deleteOne(
                    { _id: generalId}
                );

                res.status(200).json({status: '200 OK', message: 'Appointment have successfully removed from queue'});
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = DentalController;