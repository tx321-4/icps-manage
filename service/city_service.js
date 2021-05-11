const models = require('../models/models');
const {sequelize } = require('../models/db');
let city_model = models.city_model;

// 搜索所有
exports.findAll = async(opt) => {
  const result = await city_model.findAll(opt);
  return result;
}

// 查找是否存在城市
exports.findCityName = async (city) => {
  const result = await city_model.findOne({ include: [{ all: true }], where: { cityname: city } });
  return result;
};
// 查找是否存在城市
exports.findCityId = async (id) => {
  const result = await city_model.findOne({ include: [{ all: true }], where: { id: id } });
  return result;
};

//添加城市
exports.create = async (city, firstletter) => {
  await city_model.create({cityname: city, firstletter: firstletter});
}
// 修改城市
exports.cityModify =  async(id, cityname, firstletter,subjectCount) =>{
  await sequelize.transaction({ autocommit: true }, async (t) => {
    let opt = {
      cityname: cityname,
      firstletter: firstletter,
      subjectCount: subjectCount
    };
    await city_model.update(opt, { where: { id: id }, transaction: t });
  });

  }
// 删除城市
exports.deleteCityId = async(id) =>{
  await sequelize.transaction({ autocommit: true }, async (t) => {
    await city_model.destroy({ where: { id: id }, transaction: t });
  });
 
}