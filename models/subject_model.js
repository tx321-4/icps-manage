const { Sequelize, sequelize } = require('./db');
const city_model = require('./city_model');

const subject_model = sequelize.define(
  'subject_model',
  {
    id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    icp_num: {
      type: Sequelize.STRING,
      unique: true, // 唯一约束
      allowNull: false, // 非空约束
      comment: '备案号'
    },
    subject_name: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '主办单位或主办人全称'
    },
    subject_num: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '主办单位证件号码'
    },
    subject_residence: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '主办单位证件住所'
    },
    subject_area: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '主办单位所属区域'
    },
    subject_addr: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '主办单位通信地址'
    },
    subject_name2: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '投资人或主管单位'
    },
    subjectman: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '负责人姓名'
    },
    subjectman_num: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '负责人证件号码'
    },
    subjectman_tel1: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '联系方式1'
    },
    subjectman_tel2: {
      type: Sequelize.STRING,
      comment: '联系方式2'
    },
    subjectman_tel3: {
      type: Sequelize.STRING,
      comment: '应急联系电话'
    },
    subjectman_email: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '电子邮件地址'
    },
    note_info: {
      type: Sequelize.STRING,
      comment: '备注信息'
    },
    websiteCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '网站个数'
    },
    subject_state: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '备案状态'
    },
    subject_stateinfo: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '备案状态说明'
    },
  },
  {
    tableName: 'subject',
    timestamps: true // 默认增加 createdAt 字段
  }
);

subject_model.belongsTo(city_model, { foreignKey: 'cityId', as: 'city' });
module.exports = subject_model;
