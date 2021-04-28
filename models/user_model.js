const { Sequelize, sequelize } = require('./db');
const usertype_model = require('./usertype_model');
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

user_model.belongsTo(usertype_model, { foreignKey: 'usertypenum', as: 'usertype' });

module.exports = user_model;
