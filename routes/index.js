import express from 'express'
import authRoutes from "../routes/authRoutes.js"
import habitRoutes from "../routes/habitRoutes.js"

const router = express.Router();

router.use('/auth', authRoutes)
router.use('/user', habitRoutes)

export default router;