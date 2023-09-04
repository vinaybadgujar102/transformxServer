import jwt from 'jsonwebtoken';
import User from '../model/User.js'; // Update the import path to your actual file structure

const SECRET = 'your-secret-key'; // Replace with your actual secret key

export const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
