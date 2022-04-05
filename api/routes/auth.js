const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// REGISTER

router.post("/register", async (req, res) => {
  try {
    // console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    // console.log(salt);
    console.log("Original Pass : " + req.body.password);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    console.log("Hash Pass : " + hashedPass);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    // console.log(newUser);
    // save on db
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong Credentials");
    // console.log(user);

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong Credentials");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
    // res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// export
module.exports = router;
