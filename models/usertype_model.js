const { Sequelize, sequelize }  = require('./db');
// 成员类型表
const usertype_model = sequelize.define(
  'usertype_model',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    typename: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      comment: '成员类型名称'
    },
      usertypeCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '成员类型个数'
      }
    },
    {
      tableName: 'usertype',
      timestamps: true
    }
);

module.exports = usertype_model;