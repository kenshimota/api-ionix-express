"use strict";
const data = require("../demo/users.json");
const Users = require("../../app/services/users");
const list = data.filter((user) => user.password.length >= 7);

module.exports = {
  /**
   * Function that create the users init
   */
  async up() {
    const users = new Users();
    for (let i = 0; i < list.length; i++) await users.create(list[i]);
  },

  /**
   * Function the remove users creates
   */
  async down() {
    const users = new Users();
    for (let i = 0; i < list.length; i++) {
      const user = await users
        .getUsername(list[i].username)
        .then((user) => user.dataValues);
      await users.delete(user.id);
    }
  },
};
