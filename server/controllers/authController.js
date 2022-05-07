const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  //generate hashed password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  let newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    newUser = await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({ message: "email or password is wrong" });

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!correctPassword)
      res.status(400).json({ message: "email or password is wrong" });

    const { password, ...others } = user._doc;
    const accessToken = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({ user: others, accessToken });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports.AuthController = { register, login };
