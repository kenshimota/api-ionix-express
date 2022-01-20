const express = require("express");
const app = express();
const port = process.env | 3000;

app.listen(port, () => {
  console.log(`the server started to port ${port}`);
});
