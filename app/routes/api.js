const { Router } = require("express");
const router = Router();

const users = require("./api/users");
const auth = require("./api/auth");
const me = require("./api/me");

router.use("/users", users);
router.use("/auth", auth);
router.use("/me", me);
module.exports = router;
