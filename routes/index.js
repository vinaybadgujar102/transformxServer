import express from 'express'
import authRoutes from "../routes/authRoutes.js"
import habitRoutes from "../routes/habitRoutes.js"
import userRoutes from "../routes/userRoutes.js"

const router = express.Router();

router.use('/auth', authRoutes)
router.use('/user/habits', habitRoutes)
router.use('/user', userRoutes);

export default router;