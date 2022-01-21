const { Router, response } = require("express");
const AuthHeaders = require("../../middlewares/auth-headers");
const router = Router();

/**
 * # POST /api/auth/login
 * Function that return token valid
 * @param {String} username
 * @param {String} password
 * @param {Object} propio
 */
router.get("/", AuthHeaders, async function (req, res) {
  res.json(req.currentUser);
});

module.exports = router;
