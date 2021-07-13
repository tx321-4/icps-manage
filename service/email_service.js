const models = require('../models/models');
const {sequelize } = require('../models/db');
let email_model = models.email_model;

// 搜索所有
exports.findList = async() => {
  const result = await email_model.findAll({include: [{all: true}]});
  return result;
}

// 查找是否存在邮箱
exports.findEmailNum = async (num) => {
  const result = await email_model.findOne({ include: [{ all: true }], where: { email_num: num } });
  return result;
};

// 查找是否存在邮箱
exports.findEmailId = async (id) => {
  const result = await email_model.findOne({ include: [{ all: true }], where: { id: id } });
  return result;
};

//添加邮箱
exports.create = async (num, name) => {
  await email_model.create({email_num: num, email_name: name});
}
// 修改邮箱
exports.EmailModify =  async(id, num, name) =>{
  await sequelize.transaction({ autocommit: true }, async (t) => {
    let opt = {
      email_num: num,
      email_name: name,
 
    };
    await email_model.update(opt, { where: { id: id }, transaction: t });
  });

  }
// 删除邮箱
exports.deleteEmailId = async(id) =>{
  await sequelize.transaction({ autocommit: true }, async (t) => {
    await email_model.destroy({ where: { id: id }, transaction: t });
  });
 
}