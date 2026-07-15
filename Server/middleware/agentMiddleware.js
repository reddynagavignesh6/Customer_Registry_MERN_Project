const agentMiddleware = (req, res, next) => {

    if (req.user.role !== "agent") {
        return res.status(403).json({
            message: "Access Denied. Agent Only."
        });
    }

    next();
};

module.exports = agentMiddleware;