const { Sequelize, sequelize }  = require('./db');
// 角色表
const role_model = sequelize.define(
  'role_model',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rolename: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      comment: '角色名称'
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '角色总数'
    }
  },
  {
    tableName: 'role',
    timestamps: true
  }
);

module.exports = role_model;