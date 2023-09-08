import jwt from 'jsonwebtoken';
import { SECRET } from '../index.js';

export const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        console.log("in checkAuth: token not verifying")
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
    console.log("in checkAuth")
  }
};
