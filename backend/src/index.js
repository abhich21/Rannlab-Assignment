const express = require("express");
const cors = require("cors");
const connect = require("./configs/db")
const userController = require("./controllers/user.controller");



const app = express();
app.use(express.json());
app.use(cors());


app.use("/auth", userController);

const port = process.env.PORT || 8000;

app.listen(port, async (req, res) => {
  try {
    await connect();
    console.log(`listening to port ${port}`)
  } catch (err) {
    console.log("error connecting in port",err);
  }
});