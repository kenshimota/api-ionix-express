const { Sequelize } = require("sequelize");
const configDatabase = require("../../config/database");
const env = process.env.NODE_ENV || "development";

/**
 * Function that return instances model with key
 * @return {Object}
 */
const createModelInstances = function () {
  const sequelize = new Sequelize({
    username: configDatabase[env].username,
    password: configDatabase[env].password,
    database: configDatabase[env].database,
    host: configDatabase[env].host,
    dialect: configDatabase[env].dialect,
  });

  const models = {};

  const modelDefiners = {
    users: require("./users"),
  };

  for (const index in modelDefiners)
    models[index] = modelDefiners[index](sequelize, Sequelize.DataTypes);
  return models;
};

module.exports = createModelInstances();
