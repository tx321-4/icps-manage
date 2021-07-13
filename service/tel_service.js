const models = require('../models/models');
const {sequelize } = require('../models/db');
let tel_model = models.tel_model;

// 搜索所有
exports.findList = async() => {
  const result = await tel_model.findAll({include: [{all: true}]});
  return result;
}

// 查找是否存在手机号
exports.findTelNum = async (num) => {
  const result = await tel_model.findOne({ include: [{ all: true }], where: { tel_num: num } });
  return result;
};

// 查找是否存在手机号
exports.findTelId = async (id) => {
  const result = await tel_model.findOne({ include: [{ all: true }], where: { id: id } });
  return result;
};

//添加手机号
exports.create = async (num, name) => {
  await tel_model.create({tel_num: num, tel_name: name});
}
// 修改手机号
exports.TelModify =  async(id, num, name) =>{
  await sequelize.transaction({ autocommit: true }, async (t) => {
    let opt = {
      tel_num: num,
      tel_name: name,
 
    };
    await tel_model.update(opt, { where: { id: id }, transaction: t });
  });

  }
// 删除手机号
exports.deleteTelId = async(id) =>{
  await sequelize.transaction({ autocommit: true }, async (t) => {
    await tel_model.destroy({ where: { id: id }, transaction: t });
  });
 
}