const express = require("express");
const dentalController = require("../controllers/dental-controller");
const { authentication, adminAuthentication } = require("../helpers/auth");

const router = express.Router();

router.get("/", authentication, dentalController.getDentalRootHandler);
router.post("/", authentication, dentalController.postDentalRootHandler);
router.delete("/:id", adminAuthentication, dentalController.deleteDentalByIdHandler);

module.exports = router;