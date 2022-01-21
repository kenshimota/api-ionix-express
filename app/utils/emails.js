class Emails {
  /**
   * Function that set the email an string
   * @param {String} str
   * @return {Boolean}
   */
  setEmail(str) {
    const valid = this.validate(str);
    this.email = str;
    return valid;
  }

  /**
   * Function that return an string with the email
   * @return {String}
   */
  getEmail() {
    return this.email;
  }

  /**
   * Function that check if string is valid
   * @param {String} str
   * @return {Boolean}
   */
  validate(str) {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!str || str.length == 0) throw new Error("the email can't is void");

    const validResponse = str.match(validRegex);
    if (!validResponse) throw new Error("the email not is valid");

    return true;
  }
}

module.exports = Emails;
