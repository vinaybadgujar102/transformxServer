import express from 'express';
import { checkAuth } from '../utils/checkAuth.js';

import { createHabit, getAllHabits, getHabitById, deleteHabit } from '../controllers/habit.js';

const router = express.Router();

// Get all habits for the authenticated user
router.get('/', checkAuth, getAllHabits);
// Get a habit by its ID for the authenticated user
router.get('/:habitId', checkAuth, getHabitById);
// // Create a new habit for the authenticated user
router.post('/', checkAuth, createHabit);
// // Edit a habit by its ID for the authenticated user
// router.put('/habits/:habitId', checkAuth, editHabit);
// Delete a habit by ID for the authenticated user
router.delete('/:habitId', checkAuth, deleteHabit);



export default router;