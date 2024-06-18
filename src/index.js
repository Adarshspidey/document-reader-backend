const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
// const jwt = require("jsonwebtoken");
const AuthorRouter = require("./Routes/Author");
const SignupRouter = require("./Routes/Auth");
const DocumentRouter = require("./Routes/Document");
app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/document");
    console.log("Connect to database");
  } catch (error) {
    console.log(error);
  }
};
connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/author", AuthorRouter);
app.use("/user", SignupRouter);
app.use("/document", DocumentRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
