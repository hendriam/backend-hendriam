"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);

const ENV = process.env.NODE_ENV;
const DB_NAME = process.env.DB_NAME || "merah-kuning-hijau-db";

const config = require(__dirname + "/../config/config.json")[ENV][DB_NAME];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  Object.assign({}, config, {
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
    logging: console.log,
  }),
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
    // console.log(model);
  });

Object.keys(db).forEach((modelName) => {
  // console.log(modelName);

  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
// console.log(db);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
