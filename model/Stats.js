import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  streak: {
    type: Number,
    default: 0,
  },
  weeklyRecord: {
    type: Number,
    default: 0,
  },
  monthlyRecord: {
    type: Number,
    default: 0,
  },
  yearlyRecord: {
    type: Number,
    default: 0,
  },
  allTimeRecord: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('Stats', statsSchema)
