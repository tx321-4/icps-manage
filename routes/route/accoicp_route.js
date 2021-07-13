const accoicp_service = require('../../service/accoicp_service');
const subject_service = require('../../service/subject_service');
const tel_service = require('../../service/tel_service');
const email_service = require('../../service/email_service');
//获取账户列表
exports.list = async(req,res) =>{
  const accoicps = await accoicp_service.findList();
  const subjects = await subject_service.findAllTwo();

  for (let i = 0; i < accoicps.length; i++) {
    let tel = accoicps[i].acco_tel;
    let email = accoicps[i].acco_email;
    let telname = await tel_service.findTelNum(tel);
    let emailname = await email_service.findEmailNum(email);
    if (telname) {
      accoicps[i].acco_t_user = telname.tel_name;
    }
    if (emailname) {
      accoicps[i].acco_e_user = emailname.email_name;
    }
  }

  if(req.session.user.roleId !== 1 ){
    // 不是超级管理员
    for (let i = 0; i < accoicps.length; i++) {
      let tel = accoicps[i].acco_tel;
      let email = accoicps[i].acco_email;
      let newtel = tel.replace(tel.slice(3, 7), '****');
      let newemail = email.replace(email.slice(3, 7), '****');
      accoicps[i].acco_tel = newtel;
      accoicps[i].acco_email = newemail;
    }
  }

  res.render('accoicp/list', {
    title: '账户列表',
    accoicps: accoicps,
    subjects:subjects,
    length: accoicps.length
  });
}

//添加账户
exports.add = async(req, res) =>{
  let subjectId = req.body.subjectId;
  let acco_tel = req.body.acco_tel.trim();
  let acco_email = req.body.acco_email.trim();
  let accoicp = await accoicp_service.findSubjectId(subjectId);
  try {
    if(accoicp){
      req.flash('danger', '账户已存在');
      return res.redirect('/accoicp/list');
    }else{
      await accoicp_service.create(acco_tel,acco_email,subjectId);
      req.flash('success', '添加账户成功');
      return res.redirect('/accoicp/list');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('/accoicp/list');
  }
}

//获取账户信息
exports.edit = async(req,res) =>{
  const id = req.params.accoId;
  let accoicp = await accoicp_service.findAccoId(id);
  try {
    if(accoicp){
      res.render('accoicp/edit', {
        title: '修改账户-'+accoicp.subject.subject_name,
        accoicp: accoicp,
      })  
    }else{
      req.flash('danger', '账户不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  } 
}
//修改账户信息
exports.process_edit = async(req, res) =>{
  let accoId = req.body.id;
  let subjectId = req.body.subjectId;
  let acco_email = req.body.acco_email.trim();
  let acco_tel = req.body.acco_tel.trim();
  let accoicp = await accoicp_service.findAccoId(accoId);
  try {
    if(accoicp){
      await accoicp_service.AccoModify(accoId, acco_tel,acco_email,subjectId);
      req.flash('success', '修改账户成功');
      return res.redirect('/accoicp/list');  
    }else{
      req.flash('danger', '账户不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }

}

//删除账户
exports.delete = async(req, res) =>{
  const id = req.params.accoId;
  let accoicp = await accoicp_service.findAccoId(id);
  try {
    if(accoicp){
        await accoicp_service.deleteAccoId(id);
        req.flash('success', '删除账户成功');
        return res.redirect('/accoicp/list');
       
    }else{
      req.flash('danger', '账户不存在');
      return res.redirect('/accoicp/list');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  } 
}