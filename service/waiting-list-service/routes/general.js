const express = require("express");
const generalController = require("../controllers/general-controller");
const { authentication, isAdmin } = require("../helpers/auth");

const router = express.Router();

router.get("/", authentication, generalController.getGeneralRootHandler);
router.post("/", authentication, generalController.postGeneralRootHandler);
router.delete("/:id", isAdmin, generalController.deleteGeneralByIdHandler);

module.exports = router;