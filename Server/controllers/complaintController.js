const Complaint = require("../models/Complaint");

// Create Complaint

const createComplaint = async (req, res) => {

    try {

        const { title, description, category } = req.body;

        const complaint = await Complaint.create({

            title,
            description,
            category,
            customer: req.user.id

        });

        res.status(201).json(complaint);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get My Complaints
const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            customer: req.user.id
        });

        res.status(200).json(complaints);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Complaint Status
const updateComplaintStatus = async (req, res) => {

    try {

        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {

            return res.status(404).json({
                message: "Complaint not found"
            });

        }

        console.log("Complaint Agent:", complaint.agent);
        console.log("Logged in Agent ID:", req.user.id);

        if (!complaint.agent) {

            return res.status(400).json({
                message: "Complaint is not assigned to any agent"
            });

        }

        if (complaint.agent.toString() !== req.user.id) {

            return res.status(403).json({
                message: "Only assigned agent can update status"
            });

        }

        complaint.status = req.body.status;

        await complaint.save();

        console.log("Status Updated Successfully");

        res.status(200).json({
            message: "Complaint updated successfully",
            complaint
        });

    } catch (error) {

    alert(error.response?.data?.message || "Something went wrong");

}


};

// Delete Complaint
const deleteComplaint = async (req, res) => {

    try {

        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {

            return res.status(404).json({
                message: "Complaint not found"
            });

        }

        // Customer can delete only their own complaint.
        // Admin can delete any complaint.

        if (
            req.user.role !== "admin" &&
            complaint.customer.toString() !== req.user.id
        ) {

            return res.status(403).json({
                message: "Access Denied"
            });

        }

        await complaint.deleteOne();

        res.status(200).json({
            message: "Complaint deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Edit Complaint
const editComplaint = async (req, res) => {

    try {

        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {

            return res.status(404).json({
                message: "Complaint not found"
            });

        }

        complaint.title = req.body.title;
        complaint.category = req.body.category;
        complaint.description = req.body.description;
        complaint.status = req.body.status;

        await complaint.save();

        res.status(200).json({
            message: "Complaint Updated Successfully",
            complaint
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get All Complaints
const getAllComplaints = async (req, res) => {
    try {

        const complaints = await Complaint.find()
            .populate("customer", "name email phone")
            .populate("agent", "name email");

        res.status(200).json(complaints);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Assign Complaint to Agent
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

        // Don't change status here

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

// Get Assigned Complaints
const getAssignedComplaints = async (req, res) => {
    try {

        const complaints = await Complaint.find({
            agent: req.user.id
        })
        .populate("customer", "name email phone");

        res.status(200).json(complaints);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createComplaint,
    getMyComplaints,
    updateComplaintStatus,
    deleteComplaint,
    editComplaint,
    getAllComplaints,
    assignComplaint,
    getAssignedComplaints
};