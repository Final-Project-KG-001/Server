const { getDatabase } = require('../config/connection');

class DoctorController {
    static database() {
        return getDatabase().collection('doctors');
    }

    static async getDoctorRootHandler(req, res, next) {
        try {
            const doctors = await this.database().find().toArray();

            res.status(200).json(doctors);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = DoctorController;