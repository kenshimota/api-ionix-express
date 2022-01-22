const jwt = require("jsonwebtoken");
const secretKey = "89127387123n123yoj1io2j0912371297398091283n12k37812y";

const HashPassword = require("../utils/hash-password");
const Users = require("./users");

class Auth {
  /**
   * Function that create a token authorization
   * @param {String} username
   * @param {String} password
   * @return {String}
   */
  async signin({ username, password }) {
    try {
      const hash = new HashPassword();
      hash.setPassword(password);

      const users = new Users();
      const user = await users
        .getUsername(username)
        .then((user) => user.dataValues);

      if (!user) throw new Error("the user is not exists");
      if (user.password != hash.getToken())
        throw new Error("invalid credentials");

      delete user["password"];
      const token = jwt.sign(user, secretKey, {
        expiresIn: "2h",
      });

      return token;
    } catch (error) {
      throw new Error("sorry, the username or password is wrong");
    }
  }

  /**
   * Function that check token and return data user
   * @param {String} token
   * @return {Object}
   */
  async checkToken(token) {
    try {
      const payload = jwt.verify(token, secretKey);
      if (!payload) throw new Error("sorry, invalid credentials");

      const users = new Users();
      const user = await users
        .getId(payload.id)
        .then((user) => user.dataValues);

      if (!user) throw new Error("sorry, the user not exists");

      return payload;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Auth;
