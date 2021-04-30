const { Sequelize, sequelize } = require('./db');
const city_model = sequelize.define(
  'city_model',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstletter: {
      type: Sequelize.STRING,
      comment: '首字母'
    },
    cityname: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      comment: '城市名'
    },
    subjectCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '资质个数'
    }
  },
  {
    tableName: 'city',
    timestamps: true //默认增加 createAt 字段
  }
);

module.exports = city_model;