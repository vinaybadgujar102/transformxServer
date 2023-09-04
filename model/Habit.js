import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    time: {
      type: String,
    },
    metric: {
      type: String,
    },
    ritual: {
      type: String,
    },
    shortReward: {
      type: String,
    },
    longReward: {
      type: String,
    },
  });

export default mongoose.model('Habit', habitSchema);
