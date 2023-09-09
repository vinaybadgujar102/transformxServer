import Habit from "../model/Habit.js";
import Stats from "../model/Stats.js";
import User from "../model/User.js";

export const getAllHabits = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate(
      "habits"
    );

    if (user) {
      const habits = user.habits;
      res.json({ habits: user.habits || [] });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.habitId);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Check if the user has the habit in their habits array
    if (user.habits.includes(habit._id)) {
      return res.json({ habit });
    } else {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this habit" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createHabit = async (req, res) => {
  const { title, location, time, metric, ritual, shortReward, longReward } =
    req.body;

  try {
    const user = await User.findOne({ email: req.user.email });
    if (user) {
      const newStats = new Stats();
      await newStats.save();

      // Create a new habit
      const newHabit = new Habit({
        title,
        location,
        hour: time.hour,
        mins: time.mins,
        isAM: time.isAM,
        is24hour: time.is24hour,
        metricTitle: metric.title,
        metricMin: metric.minimum,
        metricIdeal: metric.ideal,
        ritual,
        shortReward,
        longReward,
        stats: newStats._id,
      });

      await newHabit.save();
      user.habits.push(newHabit);
      await user.save();
      res
        .status(201)
        .json({ message: "Habit created successfully", habit: newHabit });
    } else {
      res.status(403).json({ message: "Invalid user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editHabit = async (req, res) => {
  const { habitId } = req.params;
  const { title, location, hour, mins, isAM, is24hour, metricTitle, metricMin, metricIdeal, ritual, shortReward, longReward, icon } = req.body;

  try {
    const habit = await Habit.findById(habitId);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not have permission to edit this habit' });
    }

    // Update only the specified fields if they exist in the request body
    if (title) {
      habit.title = title;
    }
    if (location) {
      habit.location = location;
    }
    if (hour !== undefined) {
      habit.hour = hour;
    }
    if (mins !== undefined) {
      habit.mins = mins;
    }
    if (isAM !== undefined) {
      habit.isAM = isAM;
    }
    if (is24hour !== undefined) {
      habit.is24hour = is24hour;
    }
    if (metricTitle) {
      habit.metricTitle = metricTitle;
    }
    if (metricMin !== undefined) {
      habit.metricMin = metricMin;
    }
    if (metricIdeal !== undefined) {
      habit.metricIdeal = metricIdeal;
    }
    if (ritual) {
      habit.ritual = ritual;
    }
    if (shortReward) {
      habit.shortReward = shortReward;
    }
    if (longReward) {
      habit.longReward = longReward;
    }
    if (icon) {
      habit.icon = icon;
    }

    // Save the updated habit
    await habit.save();

    res.json({ message: 'Habit edited successfully', habit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteHabit = async (req, res) => {
  const { habitId } = req.params;

  try {
    // Find the habit by ID
    const habit = await Habit.findById(habitId);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // Check if the authenticated user owns the habit
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const userHasHabit = user.habits.some((userHabit) =>
      userHabit.equals(habit._id)
    );

    if (!userHasHabit) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this habit" });
    }

    // Remove the habit from the user's habits array and save
    user.habits = user.habits.filter(
      (userHabit) => !userHabit.equals(habit._id)
    );
    await user.save();

    // Delete the habit from the database
    await Habit.findByIdAndDelete(habitId);

    res.json({ message: "Habit deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
