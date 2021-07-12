const { Sequelize, sequelize } = require('./db');
const tel_model = sequelize.define(
  'tel_model',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tel_num: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      comment: '电话号码'
    },
    tel_name: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '电话所属人员'
    }
  },
  {
    tableName: 'tel',
    timestamps: true
  }
);

module.exports = tel_model;