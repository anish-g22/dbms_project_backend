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
<<<<<<< HEAD
// router.post("/studentslist", companyController.postStudentList);
=======
router.post("/studentslist", companyController.getApplicants);
router.post("/interviewdetails", companyController.getInterviewDetails);
>>>>>>> 88397aea784b476817587c2fa4192e1da37a9936
router.post("/applicants", companyController.postApplicants);

module.exports = router;
