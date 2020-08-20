const express = require("express");
const dentalController = require("../controllers/dental-controller");
const { authentication } = require("../helpers/auth");

const router = express.Router();

router.get("/", authentication, dentalController.getDentalRootHandler);
router.post("/", authentication, dentalController.postDentalRootHandler);
router.delete("/:id", authentication, dentalController.deleteDentalByIdHandler);

module.exports = router;