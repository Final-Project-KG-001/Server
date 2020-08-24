const express = require("express");
const dentalController = require("../controllers/dental-controller");
const { authentication, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", authentication, dentalController.getDentalRootHandler);
router.post("/", authentication, dentalController.postDentalRootHandler);
router.delete("/:id", authentication, isAdmin, dentalController.deleteDentalByIdHandler);

module.exports = router;