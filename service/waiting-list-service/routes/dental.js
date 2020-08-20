const express = require("express");
const dentalController = require("../controllers/dental-controller");
const { authentication, isAdmin } = require("../helpers/auth");

const router = express.Router();

router.get("/", authentication, dentalController.getDentalRootHandler);
router.post("/", authentication, dentalController.postDentalRootHandler);
router.delete("/:id", isAdmin, dentalController.deleteDentalByIdHandler);

module.exports = router;