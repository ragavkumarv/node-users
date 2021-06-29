// const express = require("express");
import express from "express";
import mongoose from "mongoose";
import { Users } from "./models/users.js";
const app = express();
const PORT = 5000;
// Recipe app should come from below method &
// Use this api in React app (localhost:5000)
// app.get('/', (request, respone) => {
//     respone.send()
// })
// const USERS = [
//   {
//     createdAt: "2021-06-27T10:22:01.580Z",
//     name: "Cody Stoltenberg",
//     avatar: "https://cdn.fakercloud.com/avatars/borantula_128.jpg",
//     id: "2",
//   },
//   {
//     createdAt: "2021-06-28T00:47:11.790Z",
//     name: "Lynette Beer Jr.",
//     avatar: "https://cdn.fakercloud.com/avatars/mbilderbach_128.jpg",
//     id: "3",
//   },
//   {
//     createdAt: "2021-06-27T08:24:05.634Z",
//     name: "Maxine Beier MD",
//     avatar: "https://cdn.fakercloud.com/avatars/iqbalperkasa_128.jpg",
//     id: "4",
//   },
//   {
//     createdAt: "2021-06-27T21:02:07.172Z",
//     name: "Jane Luettgen",
//     avatar: "https://cdn.fakercloud.com/avatars/sementiy_128.jpg",
//     id: "1",
//   },
//   {
//     createdAt: "2021-06-27T10:27:50.275Z",
//     name: "Joann Schoen",
//     avatar: "https://cdn.fakercloud.com/avatars/nilshoenson_128.jpg",
//     id: "5",
//   },
//   {
//     createdAt: "2021-06-28T00:31:53.259Z",
//     name: "James Turcotte",
//     avatar: "https://cdn.fakercloud.com/avatars/lanceguyatt_128.jpg",
//     id: "6",
//   },
//   {
//     createdAt: "2021-06-27T09:04:11.938Z",
//     name: "Miss Steven Champlin",
//     avatar: "https://cdn.fakercloud.com/avatars/lebinoclard_128.jpg",
//     id: "7",
//   },
//   {
//     createdAt: "2021-06-27T15:27:42.849Z",
//     name: "Lewis Jones",
//     avatar: "https://cdn.fakercloud.com/avatars/reideiredale_128.jpg",
//     id: "8",
//   },
// ];

// Opened Connection to DB, movieData - db name
const url = "mongodb://localhost/movieData";

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
con.on("open", () => console.log("MongoDB is connected"));

// middleware
app.use(express.json());

app.get("/", (request, respone) => {
  respone.send("Welcome to node app!!!! Hi Guys");
});

app.get("/users", async (request, respone) => {
  const users = await Users.find();
  respone.send(users);
});

// app.get("/users", (request, respone) => {
//   Users.find().then((users) => respone.send(users));
// });

// fetch - returns promise
// async - JS - WebApi -> Callback Q ->  Event loop -> Call Stack
// User.find() -
// db.users.find({id: "3"})
app.get("/users/:id", async (request, respone) => {
  const { id } = request.params;
  const user = await Users.findOne({ id: id });
  respone.send(user);
});

// Use insertMany insertOne
// Add Users - recipe app
app.post("/users", async (request, respone) => {
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

// ORM - mongoDB deleteOne, couchDB removeOne // U can interact with multiple database
// Migration is a breeze
// remove
app.delete("/users/:id", async (request, respone) => {
  const { id } = request.params;
  try {
    const user = await Users.findById(id);
    await user.remove();
    // console.log();
    respone.send({ ...user, message: "Deleted successfully" });
  } catch (err) {
    respone.status(500);
    respone.send("User is missing");
  }
});

// put & delete

app.listen(PORT, () => console.log("The server is started in " + PORT));

// npm init - It will package json
// npm install express
// npm install --save-dev nodemon
// npm install mongoose

// ORM - Object–relational mapping

// Create react app - new app
// use this user data
