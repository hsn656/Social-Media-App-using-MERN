const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      minlength: 3,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
    },
    followings: {
      type: Array,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
    desc: {
      type: String,
      default: "",
      maxlength: 50,
    },
    city: {
      type: String,
      maxlength: 50,
    },
    from: {
      type: String,
      maxlength: 50,
    },
    relationship: {
      type: String,
      enum: ["single", "married", "complicated"],
      default: "single",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
