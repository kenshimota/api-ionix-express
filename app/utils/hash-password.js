const sha256 = require("js-sha256");

class HashPassword {
  /**
   * Function that encrypte an string
   * @param {String} str
   * @return {Boolean}
   */
  setPassword(str) {
    const valid = this.validatePassword(str);
    this.token = sha256(str);
    return valid;
  }

  /**
   * Function that valid password
   * @param {String} str
   * @return {Boolean}
   */
  validatePassword(str) {
    if (!str || str.length < 7)
      throw new Error("the password must have minimun 7 characters");
    if (!str.match(/[a-z]/g))
      throw new Error("the password must have a lowercase letter");
    if (!str.match(/[A-Z]/g))
      throw new Error("the password must have an capital letter");
    if (!str.match(/[0-9]/g))
      throw new Error("the password must have a number");

    return true;
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
