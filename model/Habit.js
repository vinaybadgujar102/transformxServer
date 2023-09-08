import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  hour: {
    type: Number,
    min: 0,
    max: 23,
  },
  mins: {
    type: Number,
    min: 0,
    max: 59,
  },
  isAM: {
    type: Boolean,
    default: true,
  },
  is24hour: {
    type: Boolean,
    default: false,
  },
  metricTitle: String,
  metricMin: Number,
  metricIdeal: Number,
  ritual: String,
  shortReward: String,
  longReward: String,
  streak: Number,
  weeklyRecord: Number,
  monthlyRecord: Number,
  yearlyRecord: Number,
  allTimeRecord: Number,
  icon: String,
});

export default mongoose.model('Habit', habitSchema);
