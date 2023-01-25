const express = require("express");

const router = express.Router();
const { requireSignin, userMiddleware } = require("../middleware");
const { addSector, getSectors } = require("../controller/SectorController");

router.post("/sector/", addSector);

router.get("/sector/", getSectors);

module.exports = router;
