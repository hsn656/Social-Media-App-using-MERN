const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./router/authRoutes");
const postRoutes = require("./router/postRoutes");

dotenv.config();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT | 8800, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
