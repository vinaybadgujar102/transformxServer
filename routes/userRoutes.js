import express from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { deleteUser } from "../controllers/user.js";

const router = express.Router();

// Delete the authenticated user's account
router.delete('/', checkAuth, deleteUser);

export default router;