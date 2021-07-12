const { Sequelize, sequelize } = require('./db');
const email_model = sequelize.define(
  'email_model',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email_num: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      comment: '邮箱号码'
    },
    email_name: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '邮箱所属人员'
    }
  },
  {
    tableName: 'email',
    timestamps: true // 不默认增加 createdAt 字段
  }
);

module.exports = email_model;
