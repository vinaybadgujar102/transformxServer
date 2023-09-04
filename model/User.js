import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    habits: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit"
    }],
  });

export default mongoose.model("User", userSchema);
