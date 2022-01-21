const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./app/routes/index");

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

module.exports = app;
