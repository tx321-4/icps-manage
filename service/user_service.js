const models = require('../models/models');
const {Sequelize, sequelize} = require('../models/db');

let user_model = models.user_model;
let role_model = models.role_model;

// 查找所有角色
exports.rolesfindAll = async()=>{
  let res = await role_model.findAll({
    attributes:
    ['id','rolename'],
    order:[['id','ASC']]
  });
  return res;
}

// 注册 查找是否有相同的用户名
// exports.findUserName = async(name)=>{
//   let res = await user_model.findOne({ include: [{ all: true }], where: { username: name } });
//   return res;
// }
// 注册 查找是否有相同的用户名 关联表合并字段
exports.findUserName = async(name)=>{
  let res = await user_model.findOne({ include: [{ 
    model: role_model,
    as: 'role',
    attributes: ['rolename']
   }], where: { username: name } });
  return res;
}

// 注册
exports.register = async(name,password,roleid) =>{
  await sequelize.transaction({ autocommit: true }, async(t) =>{
    await role_model.update(
      { count: Sequelize.literal('count + 1') },
      { where: { id: roleid }, transaction: t }
    );
    let opt = {
      username: name,
      password: password,
      roleId: roleid
    };
    await user_model.create(opt, { transaction: t });
  })
}