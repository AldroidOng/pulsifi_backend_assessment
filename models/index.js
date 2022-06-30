const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql",
    operatorsAliases: false,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.job = require("./job.model")(sequelize, Sequelize);
module.exports = db;