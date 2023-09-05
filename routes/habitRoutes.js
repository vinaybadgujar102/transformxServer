import express from 'express';
import { checkAuth } from '../utils/checkAuth.js';

import { createHabit, getAllHabits, getHabitById, deleteHabit } from '../controllers/habit.js';

const router = express.Router();

// Get all habits for the authenticated user
router.get('/habits', checkAuth, getAllHabits);
// Get a habit by its ID for the authenticated user
router.get('/habits/:habitId', checkAuth, getHabitById);
// // Create a new habit for the authenticated user
router.post('/habits', checkAuth, createHabit);
// // Edit a habit by its ID for the authenticated user
// router.put('/habits/:habitId', checkAuth, editHabit);
// Delete a habit by ID for the authenticated user
router.delete('/habits/:habitId', checkAuth, deleteHabit);



export default router;