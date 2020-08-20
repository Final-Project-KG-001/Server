const express = require("express");
const doctorController = require("../controllers/doctor-controller");
const { authentication } = require("../helpers/auth");

const router = express.Router();

router.get("/", authentication, doctorController.getDoctorRootHandler);

module.exports = router;