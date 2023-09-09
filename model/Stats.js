import mongoose from 'mongoose';

// Define the schema for the 'Stats' model
const statsSchema = new mongoose.Schema({
  // Current streak of the habit
  streak: {
    type: Number,
    default: 0,
  },
  
  // Best streak achieved in a week
  weeklyRecord: {
    type: Number,
    default: 0,
  },
  
  // Best streak achieved in a month
  monthlyRecord: {
    type: Number,
    default: 0,
  },
  
  // Best streak achieved in a year
  yearlyRecord: {
    type: Number,
    default: 0,
  },
  
  // All-time best streak
  allTimeRecord: {
    type: Number,
    default: 0,
  },
});

// Create and export the 'Stats' model
export default mongoose.model('Stats', statsSchema);
