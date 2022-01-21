const model = require("../models/users");

class Users {
  /* ---- Construct ---- */
  constructor() {
    this.model = model;
  }

  /**
   * Function that get an users for id
   * @param {Number} id
   */
  async getId(id) {
    const resource = await this.model.findByPk(id);
    if (!resource) throw new Error("sorry, the users not exists");
    this.resource = this.resource;
    return resource;
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
