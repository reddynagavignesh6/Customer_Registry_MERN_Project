const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    getDashboardStats,
    getAllComplaints,
    getAllAgents,
    assignComplaint
} = require("../controllers/adminController");

/* Dashboard */
router.get(
    "/dashboard",
    protect,
    adminMiddleware,
    getDashboardStats
);

/* All Complaints */
router.get(
    "/complaints",
    protect,
    adminMiddleware,
    getAllComplaints
);

/* All Agents */
router.get(
    "/agents",
    protect,
    adminMiddleware,
    getAllAgents
);

/* Assign Complaint */
router.put(
    "/assign",
    protect,
    adminMiddleware,
    assignComplaint
);

module.exports = router;