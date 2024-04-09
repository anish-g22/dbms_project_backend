const path = require("path");

const express = require("express");

const studentController = require("../controllers/student");
const exp = require("constants");

const router = express.Router();

router.get("/", studentController.getHome);
router.get("/:id", studentController.getError);

module.exports = router;