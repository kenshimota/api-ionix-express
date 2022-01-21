const { Router } = require("express");
const router = Router();

const users = require("./api/users");
const auth = require("./api/auth");

router.use("/users", users);
router.use("/auth", auth);
module.exports = router;
