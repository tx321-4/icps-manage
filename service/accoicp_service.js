const models = require('../models/models');
const {sequelize } = require('../models/db');
let accoicp_model = models.accoicp_model;
let subject_model = models.subject_model;

// 搜索所有
exports.findList = async() => {
  const result = await accoicp_model.findAll({include: [{
    model: subject_model,
    as: 'subject',
    attributes: ['id','subject_name']
  }],
  order: [['acco_tel', 'ASC']],
  });
  return result;
}

// 查找是否存在账户
exports.findSubjectId = async (subjectId) => {
  const result = await accoicp_model.findOne({ include: [{ all: true }], where: { subjectId: subjectId } });
  return result;
};

// 查找是否存在账户
exports.findAccoId = async (id) => {
  const result = await accoicp_model.findOne({ include: [{
    model: subject_model,
    as: 'subject',
    attributes: ['id','subject_name']
    
  }], where: { id: id } });
  return result;
};

//添加账户
exports.create = async (tel, email, subjectId) => {
  await accoicp_model.create({acco_tel: tel, acco_email: email,subjectId:subjectId});
}
// 修改账户
exports.AccoModify =  async(id, tel, email, subjectId) =>{
  await sequelize.transaction({ autocommit: true }, async (t) => {
    let opt = {
      acco_tel: tel,
      acco_email: email,
      subjectId: subjectId,
 
    };
    await accoicp_model.update(opt, { where: { id: id }, transaction: t });
  });

  }
// 删除账户
exports.deleteAccoId = async(id) =>{
  await sequelize.transaction({ autocommit: true }, async (t) => {
    await accoicp_model.destroy({ where: { id: id }, transaction: t });
  });
 
}