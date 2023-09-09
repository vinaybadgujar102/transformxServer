const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  // Title of the habit (required)
  title: {
    type: String,
    required: true,
  },
  
  // Location where the habit is performed (required)
  location: {
    type: String,
    required: true,
  },
  
  // Hour of the habit (0-23)
  hour: {
    type: Number,
    min: 0,
    max: 23,
  },
  
  // Minutes of the habit (0-59)
  mins: {
    type: Number,
    min: 0,
    max: 59,
  },
  
  // AM/PM format for time (true for AM, false for PM), default is false (PM)
  isAM: {
    type: Boolean,
    default: false,
  },
  
  // 24-hour format for time, default is false (12-hour format)
  is24hour: {
    type: Boolean,
    default: false,
  },
  
  // Title for a metric associated with the habit (optional)
  metricTitle: String,
  
  // Minimum value for the associated metric (optional)
  metricMin: Number,
  
  // Ideal value for the associated metric (optional)
  metricIdeal: Number,
  
  // Description of the habit's ritual (optional)
  ritual: String,
  
  // Short-term reward for completing the habit (optional)
  shortReward: String,
  
  // Long-term reward for consistently completing the habit (optional)
  longReward: String,
  
  // Icon representing the habit (optional)
  icon: String,
  
  // Reference to associated statistics using ObjectId (reference to 'Stats' model)
  stats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stats',
  },
});

module.exports = mongoose.model('Habit', habitSchema);
