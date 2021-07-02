const models = require('../models/models');
const { Sequelize, sequelize } = require('../models/db');
let website_model = models.website_model;
let subject_model = models.subject_model;

//当前资质下 网站
exports.findList = async (subjectId) => {
  const result = await website_model.findAll({include: [{all: true}],
    where: {
      subjectId: subjectId
    },attributes:
    ['id','website_num2','website_name','websiteman','website_web','updatedAt'],
    order: [['updatedAt', 'ASC']]
  });
  return result;
};

// 条件搜索
exports.findOne = async (condition) => {
  const result = await website_model.findOne({ include: [{ all: true }], where: condition });
  return result;
};

//添加网站
exports.create = async (data) => {
  await sequelize.transaction({ autocommit: true }, async (t) => {
    if (data.subjectId && data.subjectId !== '') {
      await subject_model.update(
        { websiteCount: Sequelize.literal('websiteCount + 1') },
        { where: { id: data.subjectId }, transaction: t }
      );
    } else {
      data.subjectId = null;
    }
    let opt = {
      website_num: data.website_num,
      website_num2: data.website_num2,
      website_name: data.website_name,
      website_url: data.website_url,
      website_web: data.website_web,
      website_content: data.website_content,

      websiteman: data.websiteman,
      websiteman_num: data.websiteman_num,
      website_tel1: data.website_tel1,
      website_tel2: data.website_tel2,
      website_tel3: data.website_tel3,
      website_email: data.website_email,
      note_info: data.note_info,
      subjectId: data.subjectId
    };
    await website_model.create(opt, { transaction: t }
    );
  });
}

exports.update = async (data) => {
  await sequelize.transaction({ autocommit: true }, async (t) => {
    // 更新用户信息
    let opt = {
      website_num: data.website_num,
      website_num2: data.website_num2,
      website_name: data.website_name,
      website_url: data.website_url,
      website_web: data.website_web,
      website_content: data.website_content,

      websiteman: data.websiteman,
      websiteman_num: data.websiteman_num,
      website_tel1: data.website_tel1,
      website_tel2: data.website_tel2,
      website_tel3: data.website_tel3,
      website_email: data.website_email,
      note_info: data.note_info,
      subjectId: data.subjectId
    };
    await website_model.update(opt, { where: { id: data.id }, transaction: t });
  });
};

// 删除网站
exports.deleteId = async(id,subjectId) =>{
  await sequelize.transaction({ autocommit: true }, async (t) => {
    if (subjectId && subjectId !== '') {
      await subject_model.update(
        { websiteCount: Sequelize.literal('websiteCount - 1') },
        { where: { id: subjectId }, transaction: t }
      );
    } else {
      subjectId = null;
    }
    await website_model.destroy({ where: { id: id }, transaction: t });
  });
 
}
