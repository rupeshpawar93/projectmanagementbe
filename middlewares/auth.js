'use strict'
import jwt from 'jsonwebtoken';
import { constantVariables } from '../utilties/index.js';
const { JWT_SECRET } = process.env;

// Middleware to generate JWT token
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 60});
}

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  if (constantVariables.EXCLUDE_URL_FROM_AUTH.includes(req.url)) {
    next();
  } else {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ status: false, msg: 'Authorization token is required' });
    }

    jwt.verify(token.split(" ")[1], JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: false, msg: 'Invalid token' });
      }
      req.user = decoded.id;
      req.role = decoded.role;
      next();
    });
  }
}

export { generateToken, verifyToken };