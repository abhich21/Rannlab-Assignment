require("dotenv").config();
const express=require("express")
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const fs = require("fs");
const authenticate = require("../middlewares/authenticate")
const { upload, uploadSingle } = require("../middlewares/file_uploads");

const router=express.Router()

const newToken = (user) => {
  return jwt.sign({ user }, "rannlab");
};

router.post("/register", uploadSingle("profile_pic"), async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    if (user)
      return res.status(400).send({
        error: true,
        token: "user is already exist",
      });

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile_pic: req.file.path,
    });

    const token = newToken(user);

    res.status(200).send({ error: true,user, token });
    
  } catch (error) {
    return res.status(500).send({ error: true, token: "" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({
        error: true,
        token: "Invalid email or password",
      });
    }

    let match = user.checkPassword(req.body.password);

    if (!match) {
      return res.status(400).send({
        error: true,
        token: "Invalid email or password",
      });
    }

    const token = newToken(user);


    res.status(200).send({ error: false, user , token });
  } catch (error) {
    res.status(500).send({ error: true, token: "Server Error" });
  }
});

router.get("/user/details", authenticate, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).send({ error: false, token: user });
  } catch (error) {
    res.status(500).send({ error: true, token: "server error" });
  }
})

router.delete("/:id", async (req, res) => {
  try {
    
    fs.unlinkSync(`${user.profile_pic}`);

    const deleteuser = await User.findByIdAndDelete(req.params._id)
      .lean().exec();

    res.status(200).send({ error: false, token: "done deleting" });
  } catch (error) {
    res.status(500).send({ error: true, token: "server error" });
  }
});


module.exports = router;