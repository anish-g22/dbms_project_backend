const path = require("path");

const express = require("express");

const studentController = require("../controllers/student");
const exp = require("constants");

const router = express.Router();

router.get("/", studentController.getHome);
router.get("/AllJobs", studentController.getAllJobs);
router.get("/Updates", studentController.getUpdates);
router.get("/auth", studentController.getAuth);
router.get("/user", studentController.getStudentProfiles);

module.exports = router;
