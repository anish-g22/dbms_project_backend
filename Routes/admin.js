const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const exp = require("constants");

const router = express.Router();

router.get("/", adminController.getHome);
router.get("/allStudents", adminController.getAllStudents);
router.get("/profile", adminController.getMyDetails);

module.exports = router;
