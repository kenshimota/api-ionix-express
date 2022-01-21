const { Router, response } = require("express");
const Auth = require("../../services/auth");
const router = Router();

/**
 * # POST /api/auth/login
 * Function that return token valid
 * @param {String} username
 * @param {String} password
 * @param {Object} propio
 */
router.post("/login", async function (req, res) {
  try {
    const auth = new Auth();
    const { username, password } = req.body;
    const token = await auth.signin({ username, password });

    res.json({ token });
  } catch (error) {
    res.status(422);
    res.json({ message: error.message });
  }
});

module.exports = router;
