const roleMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    // Check if req.user exists (authMiddleware must run before this)
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Check if the user's role is in the list of allowed roles
    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Authorized roles: ${requiredRoles.join(", ")}`,
      });
    }

    next();
  };
};

module.exports = roleMiddleware;
