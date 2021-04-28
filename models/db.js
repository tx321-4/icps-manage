const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.mysql.database, config.mysql.user,config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 1000
  },
  timezone: '+08:00',
  logging: false
});

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize
};