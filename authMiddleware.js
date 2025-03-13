const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; //  'Bearer <token>'
    if (!token) {   
      return res.status(401).json({ message: "Token missing" });
    }
    
    // Verify the token
    const verified = jwt.verify(token, process.env.SCEREATE_KEY);

    // Attach user information to the request object
    req.user = verified;
    next(); 
  } catch (error) {
     res.status(400).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = authMiddleware;
