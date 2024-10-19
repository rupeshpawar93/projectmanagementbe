// middleware/auth.js
import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

// Middleware to generate JWT token
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: 60*60 });
}

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({  status: false, msg: 'Authorization token is required' });
  }

  jwt.verify(token.split(" ")[1], JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: false, msg: 'Invalid token' });
    }
    req.user = decoded.id; // Set the decoded user object on the request object
    next();
  });
}

export { generateToken, verifyToken };