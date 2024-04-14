const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const exp = require("constants");

const router = express.Router();

router.get("/", adminController.getHome);
router.get("/allStudents", adminController.getAllStudents);
router.get("/allJobs", adminController.getAllJobs);
router.get("/approvedJobs", adminController.getApprovedJobs);
router.get("/pendingJobs", adminController.getPendingJobs);
// router.get("/interviews", adminController.getInterviews);
router.get("/updates", adminController.getUpdates);
router.get("/profile", adminController.getAdminProfile);

router.post("/updates", adminController.postUpdates);
router.post("/updateProfile", adminController.postUpdateProfile);
router.post("/approve", adminController.postApproveJob);
router.post("/reject", adminController.postRejectJob);


module.exports = router;
