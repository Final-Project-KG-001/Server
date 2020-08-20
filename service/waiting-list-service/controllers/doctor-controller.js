class DoctorController {
    
    static async getDoctorRootHandler(req, res, next) {
        const Doctor = req.doctorCollection;
        
        try {
            const doctors = await Doctor.find().toArray();

            res.status(200).json(doctors);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = DoctorController;