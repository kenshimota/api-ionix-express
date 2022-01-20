const sha256 = require("js-sha256");

class HashPassword {
  /**
   * Function that encrypte an string
   * @param {String} str
   */
  constructor(str) {
    this.token = sha256(str);
  }

  /**
   * Function that return the token the password
   * @return {String}
   */
  getToken() {
    return this.token;
  }
}

module.exports = HashPassword;
