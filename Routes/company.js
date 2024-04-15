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
router.get("/interviews", companyController.getInterviews);

router.post("/updateProfile", companyController.postUpdateProfile);
router.post("/addjob", companyController.postJob);
router.post("/addjob", companyController.postJob);
router.post("/studentslist", companyController.postStudentList);
router.post("/applicants", companyController.postApplicants);

module.exports = router;
