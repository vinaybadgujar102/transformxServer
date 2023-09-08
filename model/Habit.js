import mongoose from 'mongoose';
import statsSchema from './Stats.js';

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
    default: false,
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
  icon: String,
  stats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stats'
  },
});

export default mongoose.model('Habit', habitSchema);
