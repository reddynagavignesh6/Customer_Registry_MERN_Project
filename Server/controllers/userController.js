const User = require("../models/User");

// Get All Users
const getAllUsers = async (req, res) => {
    try {

        const users = await User.find({
                role: "customer"
            }).select("-password");

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get User By ID
const getUserById = async (req, res) => {
    try {

        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Update User
const updateUser = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Delete User
const deleteUser = async (req, res) => {

    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get All Agents
const getAllAgents = async (req, res) => {
    try {

        const agents = await User.find({ role: "agent" }).select("-password");

        res.status(200).json(agents);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getAllAgents
};