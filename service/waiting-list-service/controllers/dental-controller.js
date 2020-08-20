const { getDatabase } = require("../../../../../../Week 2/Day 4/hibur-aku/server/services/movieService/config/connection");
const { ObjectId } = require("mongodb");

class DentalController {
    static database() {
        return getDatabase().collection('dentals');
    }
    
    static async getDentalRootHandler(req, res , next) {
        try {
            const dentals = await this.database().find().toArray();

            res.status(200).json(dentals);
        } catch (error) {
            next(error);
        }
    }

    static async postDentalRootHandler(req, res, next) {
        try {
            const result = await this.database().insertOne(req.body);

            res.status(201).json(result.ops[0]);
        } catch (error) {
            next(error);
        }
    }

    static async deleteDentalByIdHandler(req, res, next) {
        let dentalId = req.params.id;
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

                await this.database().deleteOne(
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