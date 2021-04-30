const models = require('../models/models');
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
//添加城市
exports.create = async (city, firstletter) => {
  await city_model.create({cityname: city, firstletter: firstletter});
}