const { ObjectId } = require("mongodb");

class GeneralController {
    static async getGeneralRootHandler(req, res , next) {
        const General = req.generalCollection;
        
        try {
            const generals = await General.find().toArray();

            res.status(200).json(generals);
        } catch (error) {
            next(error);
        }
    }

    static async postGeneralRootHandler(req, res, next) {
        const General = req.generalCollection;
        
        try {
            const result = await General.insertOne(req.body);

            res.status(201).json(result.ops[0]);
        } catch (error) {
            next(error);
        }
    }

    static async deleteGeneralByIdHandler(req, res, next) {
        let generalId = req.params.id;

        const General = req.generalCollection;
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

                await General.deleteOne(
                    { _id: generalId}
                );

                res.status(200).json({status: '200 OK', message: 'Appointment have successfully removed from queue'});
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = GeneralController;