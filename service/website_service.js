const models = require('../models/models');
const { Sequelize, sequelize } = require('../models/db');
let website_model = models.website_model;
let subject_model = models.subject_model;
let city_model = models.city_model;

//当前资质下 网站
exports.findList = async (subjectId) => {
  const result = await website_model.findAll({include: [{all: true}],
    where: {
      subjectId: subjectId
    },attributes:
    ['id','website_num2','website_name','websiteman','website_web','updatedAt'],
    order: [['updatedAt', 'DESC']]
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
      icp_num: data.icp_num,
      subject_name: data.subject_name,
      subject_num: data.subject_num,
      subject_residence: data.subject_residence,
      subject_area: data.subject_area,
      subject_addr: data.subject_addr,
      subject_name2: data.subject_name2,
      subjectman: data.subjectman,
      subjectman_num: data.subjectman_num,
      subjectman_tel1: data.subjectman_tel1,
      subjectman_tel2: data.subjectman_tel2,
      subjectman_tel3: data.subjectman_tel3,
      subjectman_email: data.subjectman_email,
      note_info: data.note_info,
      subject_state: data.subject_state,
      subject_stateinfo: data.subject_stateinfo,
      cityId: data.cityId
    };
    await website_model.update(opt, { where: { id: data.id }, transaction: t });
  });
};