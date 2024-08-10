







const jwt= require('jsonwebtoken');


const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("Token Received:", token);

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(400).send("Invalid token.");
  }
};

module.exports = authenticateUser;
