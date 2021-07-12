const models = require('../models/models');
const { Sequelize, sequelize } = require('../models/db');
let subject_model = models.subject_model;
let city_model = models.city_model;

//当前城市下 资质
exports.findList = async (cityId) => {
  const result = await subject_model.findAll({include: [{all: true}],
    where: {
      cityId: cityId
    },attributes:
    ['id','subject_name','icp_num','subjectman','websiteCount','updatedAt','subject_state','subject_stateinfo'],
    order: [['updatedAt', 'DESC']]
  });
  return result;
};
// 所有资质
exports.findAll = async () => {
  const result = await subject_model.findAll({include: [{all: true}],
    attributes:
    ['id','subject_name','icp_num','subjectman','subject_state'],
    order: [['subjectman', 'DESC']]
  });
  return result;
};

// 条件搜索
exports.findOne = async (condition) => {
  const result = await subject_model.findOne({ include: [{ all: true }], where: condition });
  return result;
};

//添加资质
exports.create = async (data) => {
  await sequelize.transaction({ autocommit: true }, async (t) => {
    if (data.cityId && data.cityId !== '') {
      await city_model.update(
        { subjectCount: Sequelize.literal('subjectCount + 1') },
        { where: { id: data.cityId }, transaction: t }
      );
    } else {
      data.cityId = null;
    }
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
    await subject_model.create(opt, { transaction: t }
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
    await subject_model.update(opt, { where: { id: data.id }, transaction: t });
  });
};

// 删除网站
exports.deleteId = async(id,cityId) =>{
  await sequelize.transaction({ autocommit: true }, async (t) => {
    if (cityId && cityId !== '') {
      await city_model.update(
        { subjectCount: Sequelize.literal('subjectCount - 1') },
        { where: { id: cityId }, transaction: t }
      );
    } else {
      cityId = null;
    }
    await subject_model.destroy({ where: { id: id }, transaction: t });
  });
 
}