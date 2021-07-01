const { Sequelize, sequelize } = require('./db');
const subject_model = require('./subject_model');

const website_model = sequelize.define(
  'website_model',
  {
    id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    website_num: {
      type: Sequelize.STRING,
      unique: true, // 唯一约束
      allowNull: false, // 非空约束
      comment: '网站编号'
    },
    website_num2: {
      type: Sequelize.STRING,
      allowNull: false, // 非空约束
      comment: '网站备案号'
    },
    website_name: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '网站名称'
    },
    website_url: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '网站URL'
    },
    website_web: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '网站域名'
    },
    website_content: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '网站内容'
    },
    websiteman: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '负责人姓名'
    },

    websiteman_num: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '证件号码'
    },
    website_tel1: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '联系方式1'
    },
    website_tel2: {
      type: Sequelize.STRING,
      comment: '联系方式2'
    },
    website_tel3: {
      type: Sequelize.STRING,
      comment: '应急联系电话'
    },

    website_email: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '负责人电子邮箱'
    },
    note_info: {
      type: Sequelize.STRING,
      comment: '备注信息'
    }
  },
  {
    tableName: 'website',
    timestamps: true // 默认增加 createdAt 字段
  }
);

website_model.belongsTo(subject_model, { foreignKey: 'subjectId', as: 'subject' });
module.exports = website_model;
