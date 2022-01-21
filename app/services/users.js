const db = require("../models/index");
const Emails = require("../utils/emails");
const HashPassword = require("../utils/hash-password");

class Users {
  /* ---- Construct ---- */
  constructor() {
    this.model = db.users;
  }

  /**
   * Function that get an users for id
   * @param {Number} id
   * @return {SequelizeModel}
   */
  async getId(id) {
    const resource = await this.model.findByPk(id);
    if (!resource) throw new Error("sorry, the users not exists");
    this.resource = resource.dataValues;
    return resource;
  }

  /**
   * Function that get an users for username
   * @param {Number} id
   * @return {SequelizeModel}
   */
  async getUsername(username) {
    const resource = await this.model.findOne({ where: { username } });
    if (!resource) throw new Error("sorry, the users not exists");
    this.resource = resource.dataValues;
    return resource;
  }

  /**
   * Function that valid username
   * @param {String} str
   * @return {Boolean}
   */
  async validUsername(str = "") {
    if (str.length < 6 && str.length > 255)
      throw new Error(
        "sorry, the username must have more 6 and maximun 255 charaters"
      );

    const response = await this.model.findOne({ where: { username: str } });
    if (response)
      throw new Error(
        "sorry, the username " + str + " exists, please intro other username"
      );

    return true;
  }

  /**
   * Function that valid firstname and lastname
   * @param {String} str
   * @return {Boolean}
   */
  validName(str) {
    if (!str || str.length <= 1)
      throw new Error(
        "sorry, the user must an firsname and lastname with 2 characteres please"
      );

    if (str.match(/[0-9]/g))
      throw new Error(
        "sorry, the user must an firsname and lastname with 2 characteres please"
      );

    return true;
  }

  /**
   * Function that create an user
   * @param {String} username
   * @param {String} email
   * @param {String} firstname
   * @param {String} lastname
   * @param {String} password
   * @return {SequelizeModel}
   */
  async create({ username, email, firstname, lastname, password }) {
    const hash = new HashPassword();
    hash.setPassword(password);

    const emails = new Emails();
    emails.setEmail(email);

    await this.validUsername(username);
    this.validName(firstname);
    this.validName(lastname);

    const attributes = {
      username,
      firstname,
      lastname,
      email: emails.getEmail(),
      password: hash.getToken(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const response = await this.model.create(attributes);
    return response;
  }

  /**
   * Function that update an user
   * @param {Number} id
   * @param {String} email
   * @param {String} firstname
   * @param {String} lastname
   * @return {SequelizeModel}
   */
  async update({ id, email, firstname, lastname }) {
    const response = await this.getId(id);

    const emails = new Emails();
    emails.setEmail(email);

    this.validName(firstname);
    this.validName(lastname);

    const attributes = {
      firstname,
      lastname,
      email: emails.getEmail(),
      updatedAt: new Date(),
    };

    response.dataValues.firstname = firstname;
    response.dataValues.lastname = lastname;
    response.dataValues.email = emails.getEmail();
    response.dataValues.updatedAt = attributes.updatedAt;
    await this.model.update(attributes, { where: { id } });

    return response;
  }

  /**
   * Function that deleted a user
   * @param {Number} id
   * @return {Boolean}
   */
  async delete(id) {
    try {
      await this.getId(id);
      await this.model.destroy({ where: { id } });
      return true;
    } catch (error) {
      throw new Error("sorry,the user don't be deleted");
    }
  }
}

module.exports = Users;
