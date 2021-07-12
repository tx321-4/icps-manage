const models = require('../models/models');
const {sequelize } = require('../models/db');
let email_model = models.email_model;

// 搜索所有
exports.findList = async(opt) => {
  const result = await email_model.findList(opt);
  return result;
}

// 查找是否存在手机号
exports.findCityName = async (city) => {
  const result = await email_model.findOne({ include: [{ all: true }], where: { cityname: city } });
  return result;
};

// 查找是否存在手机号
exports.findCityId = async (id) => {
  const result = await email_model.findOne({ include: [{ all: true }], where: { id: id } });
  return result;
};

//添加手机号
exports.create = async (city, firstletter) => {
  await email_model.create({cityname: city, firstletter: firstletter});
}
// 修改手机号
exports.cityModify =  async(id, cityname, firstletter,subjectCount) =>{
  await sequelize.transaction({ autocommit: true }, async (t) => {
    let opt = {
      cityname: cityname,
      firstletter: firstletter,
      subjectCount: subjectCount
    };
    await email_model.update(opt, { where: { id: id }, transaction: t });
  });

  }
// 删除手机号
exports.deleteCityId = async(id) =>{
  await sequelize.transaction({ autocommit: true }, async (t) => {
    await email_model.destroy({ where: { id: id }, transaction: t });
  });
 
}