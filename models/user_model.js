const { Sequelize, sequelize } = require('./db');
const role_model = require('./role_model');
// 成员表
const user_model = sequelize.define(
  'user_model',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      comment: '姓名'
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '密码'
    }
  },
  {
    tableName: 'user',
    timestamps: true // 不默认增加 createdAt 字段
  }
);

user_model.belongsTo(role_model, { foreignKey: 'roleId', as: 'role' });

module.exports = user_model;
