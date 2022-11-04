const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const exerciseRouter = require("./routes/exercise");
const usersRouter = require("./routes/users");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connection Established");
});

app.use("/exercises", exerciseRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("App is running");
});

app.listen(port, () => {
  console.log("Running");
});
