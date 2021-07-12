const { Sequelize, sequelize } = require('./db');
const subject_model = require('./subject_model');

const accoicp_model = sequelize.define(
  'accoicp_model',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    acco_tel: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '联系方式'
    },
    acco_t_user: {
      type: Sequelize.STRING,
      comment: '电话所属人员'
    },
    acco_email: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '电子邮件地址'
    },
    acco_e_user: {
      type: Sequelize.STRING,
      comment: '邮箱所属人员'
    }
  },
  {
    tableName: 'accoicp',
    timestamps: true // 不默认增加 createdAt 字段
  }
);
accoicp_model.belongsTo(subject_model, { foreignKey: 'subjectId', as: 'subject' });

module.exports = accoicp_model;
