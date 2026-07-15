const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getAllAgents
} = require("../controllers/userController");

router.get("/", protect, adminMiddleware, getAllUsers);

router.get("/agents", protect, adminMiddleware, getAllAgents);

router.get("/:id", protect,adminMiddleware,  getUserById);

router.put("/:id", protect,adminMiddleware, updateUser);

router.delete("/:id", protect,adminMiddleware, deleteUser);

module.exports = router;