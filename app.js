const app = require("./index");
const port = process.env.PORT | 3000;

console.log(`the server started to port ${port}`);
app.listen(port);
module.exports = app;
