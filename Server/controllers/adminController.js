const User = require("../models/User");
const Complaint = require("../models/Complaint");

/* ===========================
   Dashboard Statistics
=========================== */

const getDashboardStats = async (req, res) => {

    try {

        const totalCustomers = await User.countDocuments({
                role: "customer"
            });

            const totalAgents = await User.countDocuments({
                role: "agent"
            });

            const totalAdmins = await User.countDocuments({
                role: "admin"
            });

        const totalComplaints = await Complaint.countDocuments();

        const pending = await Complaint.countDocuments({
            status: "Pending"
        });

        const inProgress = await Complaint.countDocuments({
            status: "In Progress"
        });

        const resolved = await Complaint.countDocuments({
            status: "Resolved"
        });
        
        const recentComplaints = await Complaint.find()
            .populate("customer", "name")
            .populate("agent", "name")
            .sort({ createdAt: -1 })
            .limit(5);

       res.status(200).json({
            totalCustomers,
            totalAgents,
            totalAdmins,
            totalComplaints,
            pending,
            inProgress,
            resolved,
            recentComplaints
        }); 
    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/* ===========================
   Get All Complaints
=========================== */

const getAllComplaints = async (req, res) => {

    try {

        const complaints = await Complaint.find()
            .populate("customer", "name email")
            .populate("agent", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(complaints);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/* ===========================
   Get All Agents
=========================== */

const getAllAgents = async (req, res) => {

    try {

        const agents = await User.find({
            role: "agent"
        }).select("-password");

        res.status(200).json(agents);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/* ===========================
   Assign Complaint
=========================== */

const assignComplaint = async (req, res) => {

    try {

        const { agentId } = req.body;

        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {

            return res.status(404).json({
                message: "Complaint not found"
            });

        }

        complaint.agent = agentId;
        complaint.status = "In Progress";

        await complaint.save();

        res.status(200).json({
            message: "Complaint assigned successfully",
            complaint
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getDashboardStats,
    getAllComplaints,
    getAllAgents,
    assignComplaint
};