import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ings: {
    type: [String],
    required: true,
  },
  like: {
    type: Boolean,
    default: false,
  },
});

// model first argument is sigular
// and in MongoDB the collection will be plural
// Collection name - "User"
export const Recipes = mongoose.model("Recipe", recipeSchema);
