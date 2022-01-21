const express = require("express");
const app = express();
const port = process.env | 3000;
const router = require("./app/routes/index");

app.use("/", router);

app.listen(port, () => {
  console.log(`the server started to port ${port}`);
});
