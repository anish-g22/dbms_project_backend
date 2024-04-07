const path = require("path");

const express = require("express");

const studentController = require("../controllers/student");
const exp = require("constants");

const router = express.Router();

router.get("/AllJobs", studentController.getHome);
router.get("/Updates", studentController.getUpdates);
router.get("/auth", studentController.getAuth);

module.exports = router;
