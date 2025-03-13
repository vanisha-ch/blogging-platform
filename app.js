const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const db_url = process.env.MONGO_URL;
const mongoose = require("mongoose");
const authRoute = require("./routes/authroute.js");
const cors = require("cors");
const userroute = require("./routes/userRouter.js")
app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/user", userroute)


mongoose
  .connect(db_url)
  .then(() => {
    console.log("DB Connected ....");
  })
  .catch((err) => {
    console.log(err.message);
  });
app.listen(port);
