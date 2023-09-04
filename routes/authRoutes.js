import express from 'express';
import { signup, login } from '../controllers/authentication.js';

const router = express.Router();

// User authentication routes
router.post('/signup', signup);
router.post('/login', login);

export default router;