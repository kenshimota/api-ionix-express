const Auth = require("../services/auth");

/**
 * Function that check if there is a token and this is valid
 * @param {RequestExpress} req
 * @param {ResponseExpress} res
 * @param {NextExpress} next
 * @return {Void}
 */
const AuthHeaders = async function (req, res, next) {
  try {
    if (!req.headers["authorization"])
      throw new Error("sorry, invalid credentials");

    const token = req.headers["authorization"];
    const auth = new Auth();
    const user = await auth.checkToken(token);
    req.currentUser = user;

    return next();
  } catch (error) {
    res.status(401);
    res.json({ message: error.message });
  }
};

module.exports = AuthHeaders;
