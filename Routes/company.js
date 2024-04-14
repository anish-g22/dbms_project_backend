const path = require("path");

const express = require("express");

const companyController = require("../controllers/company");
const exp = require("constants");

const router = express.Router();

router.get("/", companyController.getHome);
router.get("/jobs", companyController.getMyJobs);
router.get("/application", companyController.getApplication);
router.get("/profile", companyController.getProfile);
router.get("/branches", companyController.getBranches);

router.post("/updateProfile", companyController.postUpdateProfile);
router.post("/addjob", companyController.postJob);

module.exports = router;
