import express from "express";
import { Recipes } from "../models/recipe.js";
const router = express.Router();

// 5x + 6x = x(5 +6)

router
  .route("/")
  .get(async (request, respone) => {
    // const { like } = request.query;
    // `^${request.query.title}`
    console.log("before", request.query);
    if (request.query.title) {
      request.query.title = new RegExp("^" + request.query.title, "i");
    }
    // /idly/
    console.log("after", request.query);

    const recipe = await Recipes.find(request.query);
    respone.send(recipe);
  })
  .post(async (request, respone) => {
    const addRecipe = request.body;
    console.log(addRecipe);
    const recipe = new Recipes(addRecipe);

    try {
      const newRecipe = await recipe.save();
      respone.send(newRecipe);
    } catch (err) {
      respone.status(500);
      respone.send(err);
    }
  });

router.get("/:id", async (request, respone) => {
  const { id } = request.params;
  const recipe = await Recipes.findById(id);
  respone.send(recipe);
});

export default router;
// Default exports
// import router from "./routes/recipe.js";
// import recipeRouter from "./routes/recipe.js";

// const obj = {};
// obj.a = '1'
// obj.b = (a, b) => a + b;
// obj.d = 10;
// export default obj;

// commonjs
// module.exports = {
//    recipeRouter: router
// }

// sqlite

// {
//   name: "Chinmay",
//   profile: "http://profile"
// }

// // React or post man
// // Patch request "/users/123"
// {
//   profile: "http://newprofile"
// }

// // Database
// {
//   name: "Chinmay",
//   profile: "http://newprofile"
// }

// // React or post man
// // Put request "/users/123" - Web standard
// {
//   profile: "http://newprofile"
// }

// // Database all other keys will be deleted
// {
//   profile: "http://newprofile"
// }
