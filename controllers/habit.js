import Habit from '../model/Habit.js'; 
import User from '../model/User.js';

// export const getAllHabits = async (req, res) => {
//     try {
//       // Find all habits for the authenticated user
//       const habits = await Habit.find({ user: req.user._id });
  
//       res.json({ habits });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };

//   export const getHabitById = async (req, res) => {
//     const { habitId } = req.params;
  
//     try {
//       // Find the habit by its ID
//       const habit = await Habit.findById(habitId);
  
//       if (!habit) {
//         return res.status(404).json({ message: 'Habit not found' });
//       }
  
//       // Check if the authenticated user owns the habit
//       if (habit.user.toString() !== req.user._id.toString()) {
//         return res.status(403).json({ message: 'You do not have permission to access this habit' });
//       }
  
//       res.json({ habit });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };

export const createHabit = async (req, res) => {
  const { title, location, time, metric, ritual, shortReward, longReward } = req.body;

  try {
    // Create a new habit
    const newHabit = new Habit({
      title,
      location,
      time,
      metric,
      ritual,
      shortReward,
      longReward,
    });

    const user = await User.findOne({ username: req.user.username });
    if(user){
        await newHabit.save();
        user.habits.push(newHabit);
        await user.save();
    }

    res.status(201).json({ message: 'Habit created successfully', habit: newHabit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// export const editHabit = async (req, res) => {
//     const { habitId } = req.params;
//     const { title, location, time, metric, ritual, shortReward, longReward } = req.body;
  
//     try {
//       // Find the habit by its ID
//       const habit = await Habit.findById(habitId);
  
//       if (!habit) {
//         return res.status(404).json({ message: 'Habit not found' });
//       }
  
//       // Check if the authenticated user owns the habit
//       if (habit.user.toString() !== req.user._id.toString()) {
//         return res.status(403).json({ message: 'You do not have permission to edit this habit' });
//       }
  
//       // Update the habit properties
//       habit.title = title;
//       habit.location = location;
//       habit.time = time;
//       habit.metric = metric;
//       habit.ritual = ritual;
//       habit.shortReward = shortReward;
//       habit.longReward = longReward;
  
//       // Save the updated habit
//       await habit.save();
  
//       res.json({ message: 'Habit edited successfully', habit });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };


// export const deleteHabit = async (req, res) => {
//     const { habitId } = req.params;
  
//     try {
//       // Find the habit by ID
//       const habit = await Habit.findById(habitId);
  
//       if (!habit) {
//         return res.status(404).json({ message: 'Habit not found' });
//       }
  
//       // Check if the authenticated user owns the habit
//       if (habit.user.toString() !== req.user._id.toString()) {
//         return res.status(403).json({ message: 'You do not have permission to delete this habit' });
//       }
  
//       // Remove the habit from the user's habits array
//       const user = await User.findById(req.user._id);
//       user.habits.pull(habitId);
//       await user.save();
  
//       // Delete the habit from the database
//       await Habit.findByIdAndDelete(habitId);
  
//       res.json({ message: 'Habit deleted successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };
