import User from '../model/User.js';
import Habit from '../model/Habit.js'; 

export const deleteUser = async (req, res) => {
  try {
    // Find the authenticated user by their username
    const user = await User.findOne({ username: req.user.username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user's associated habits
    const habitIdsToDelete = user.habits;

    if (habitIdsToDelete.length > 0) {
      await Habit.deleteMany({ _id: { $in: habitIdsToDelete } });
    }

    // Delete the user
    await user.deleteOne();

    res.json({ message: 'User and associated habits deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
