// const express = require("express");
import express from "express";
import mongoose from "mongoose";
import { User } from "./models/users.js";
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

// Opened Connection to DB
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
  const users = await User.find().sort({ userid: 1 }).limit(2);
  respone.send(users);
});

app.get("/users/:id", (request, respone) => {
  const { id } = request.params;
  const user = USERS.find((data) => data.id === id);
  respone.send(user);
});

// Add Users
app.post("/users", (request, respone) => {
  const addUser = request.body;
  console.log(addUser);
  USERS.push(addUser);
  console.log(USERS);
  respone.send(USERS);
});

app.listen(PORT, () => console.log("The server is started in " + PORT));

// npm init - It will package json
// npm install express
// npm install --save-dev nodemon
// npm install mongoose

// ORM - Object–relational mapping
