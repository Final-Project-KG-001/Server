const express = require("express");
const generalController = require("../controllers/general-controller");

const router = express.Router();

router.get("/", generalController.getGeneralRootHandler);
router.post("/", generalController.postGeneralRootHandler);
router.delete("/:id", generalController, deleteGeneralByIdHandler);

module.exports = router;