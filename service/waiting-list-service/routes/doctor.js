const express = require("express");
const doctorController = require("../controllers/doctor-controller");
const { authentication } = require("../middlewares/auth");

const router = express.Router();

router.get("/", authentication, doctorController.getDoctorRootHandler);

module.exports = router;