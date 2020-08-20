const express = require("express");
const dentalController = require("../controllers/dental-controller");

const router = express.Router();

router.get("/", dentalController.getDentalRootHandler);
router.post("/", dentalController.postDentalRootHandler);
router.delete("/:id", dentalController, deleteDentalByIdHandler);

module.exports = router;