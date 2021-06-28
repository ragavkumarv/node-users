import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
