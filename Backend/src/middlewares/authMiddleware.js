const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  const token = authHeader.split(" ")[1]?.trim(); // Extract the actual token and trim any whitespace

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to request
    next();
  } catch (error) {
    console.error("JWT Error:", error); // Log error details
    return res.status(400).json({ message: "Invalid token" });
  }
};
module.exports = authenticate;