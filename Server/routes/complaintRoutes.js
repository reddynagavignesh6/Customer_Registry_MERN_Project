const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const agentMiddleware = require("../middleware/agentMiddleware");
const {
    createComplaint,
    getMyComplaints,
    updateComplaintStatus,
    deleteComplaint,
    getAllComplaints,
    assignComplaint,
    getAssignedComplaints,
    editComplaint,
} = require("../controllers/complaintController");

router.post("/", protect, createComplaint);
router.get("/my", protect, getMyComplaints);
router.get("/assigned", protect, agentMiddleware, getAssignedComplaints);
router.put("/:id", protect, agentMiddleware, updateComplaintStatus);
router.delete("/:id", protect, deleteComplaint);
router.get("/", protect, getAllComplaints);
router.put("/assign/:id", protect, adminMiddleware, assignComplaint);
router.put("/edit/:id",protect,adminMiddleware,editComplaint);

module.exports = router;