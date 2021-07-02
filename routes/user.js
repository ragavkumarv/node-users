import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { auth as nice } from "../middleware/auth.js";
import { Users } from "../models/users.js";
const router = express.Router();

router
  .route("/")
  .get(nice, async (request, respone) => {
    const users = await Users.find();
    respone.send(users);
  })
  .post(async (request, respone) => {
    const addUser = request.body;
    console.log(addUser);

    // const user = new Users({
    //   id: addUser.id,
    //   avatar: addUser.avatar,
    //   createdAt: addUser.createdAt,
    //   name: addUser.name,
    // });

    const user = new Users(addUser);

    try {
      const newUser = await user.save();
      respone.send(newUser);
    } catch (err) {
      respone.status(500);
      respone.send(err);
    }
  });

router
  .route("/:id")
  .get(nice, async (request, respone) => {
    const { id } = request.params;
    const user = await Users.findById(id);
    respone.send(user);
  })
  .delete(nice, async (request, respone) => {
    const { id } = request.params;
    try {
      const user = await Users.findById(id);
      await user.remove();
      // console.log();
      respone.send({
        name: user.name,
        id: user.id,
        message: "Deleted successfully",
      });
    } catch (err) {
      respone.status(500);
      respone.send("User is missing");
    }
  })
  .patch(async (request, respone) => {
    const { id } = request.params;
    const { name, avatar } = request.body;

    try {
      const user = await Users.findById(id);
      if (name) {
        user.name = name;
      }
      if (avatar) {
        user.avatar = avatar;
      }
      await user.save();
      respone.send(user);
    } catch (err) {
      respone.status(500);
      respone.send(err);
    }
  });

router.route("/login").post(async (request, respone) => {
  const { name, password } = request.body;
  try {
    const user = await Users.findOne({ name });
    const inDbStoredPassword = user.password;
    const isMatch = await bcrypt.compare(password, inDbStoredPassword);
    if (!isMatch) {
      respone.status(500);
      respone.send({ message: "Invalid credentials!!!" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.SECERET_KEY);
      respone.send({
        ...user.toObject(),
        token,
        message: "Successful login",
      });
    }
  } catch (err) {
    respone.status(500);
    respone.send(err);
  }
});

// Creating user
router.route("/signup").post(async (request, respone) => {
  const { name, password, avatar, createdAt } = request.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new Users({
      name,
      password: passwordHash,
      avatar,
      createdAt,
    });

    await user.save();
    // db to store it
    respone.send(user);
  } catch (err) {
    respone.status(500);
    respone.send(err);
  }
});

export const userRouter = router;

// s3 bucket
