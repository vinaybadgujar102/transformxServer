import mongoose from "mongoose";

// Define the schema for the 'User' model
const userSchema = new mongoose.Schema({
  // Username of the user (required)
  username: {
    type: String,
    required: true,
  },
  
  // Email of the user (required)
  email: {
    type: String,
    required: true,
  },
  
  // Password of the user (required)
  password: {
    type: String,
    required: true,
  },
  
  // Array of references to associated 'Habit' models
  habits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habit",
  }],
});

// Create and export the 'User' model
export default mongoose.model("User", userSchema);
