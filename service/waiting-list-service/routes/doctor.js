const express = require("express");
const doctorController = require("../controllers/doctor-controller");

const router = express.Router();

router.get("/", doctorController.getDoctorRootHandler);

module.exports = router;