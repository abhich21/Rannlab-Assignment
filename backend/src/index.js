const express = require("express");
const cors = require("cors");
const connect = require("./src/configs/db");
const userController = require("./src/controllers/userControl");



const app = express();
app.use(express.json());
app.use(cors());


app.use("/auth", userController);

// app.listen to start server
app.listen(6000, async (req, res) => {
  try {
    await connect();
  } catch (err) {
    console.log("port not connected",err);
  }
});