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
      type: Date,
    },
    metric: {
      type: Number,
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
