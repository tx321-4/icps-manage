const email_service = require('../../service/email_service');

//获取邮箱列表
exports.list = async(req,res) =>{
  const emails = await email_service.findList();
  res.render('email/list', {
    title: '邮箱列表',
    emails: emails,
    length: emails.length
  });
}

//添加邮箱
exports.add = async(req, res) =>{
  let email_num = req.body.email_num.trim();
  const email_name = req.body.email_name.trim();
  let email = await email_service.findEmailNum(email_num);
  try {
    if(email){
      req.flash('danger', '邮箱已存在');
      return res.redirect('/email/list');
    }else{
      await email_service.create(email_num,email_name);
      req.flash('success', '添加邮箱成功');
      return res.redirect('/email/list');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('/email/list');
  }
}

//获取邮箱信息
exports.edit = async(req,res) =>{
  const id = req.params.emailId;
  let email = await email_service.findEmailId(id);
  try {
    if(email){
      res.render('email/edit', {
        title: '修改邮箱-'+email.email_num,
        email: email,
      })  
    }else{
      req.flash('danger', '邮箱不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  } 
}
//修改邮箱信息
exports.process_edit = async(req, res) =>{
  let emailId = req.body.id;
  let email_num = req.body.email_num.trim();
  let email_name = req.body.email_name.trim();
  let email = await email_service.findEmailId(emailId);
  try {
    if(email){
      await email_service.EmailModify(emailId, email_num, email_name);
      req.flash('success', '修改邮箱成功');
      return res.redirect('/email/list');  
    }else{
      req.flash('danger', '邮箱不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }

}

//删除邮箱
exports.delete = async(req, res) =>{
  const id = req.params.emailId;
  let email = await email_service.findEmailId(id);
  try {
    if(email){
        await email_service.deleteEmailId(id);
        req.flash('success', '删除邮箱成功');
        return res.redirect('/email/list');
       
    }else{
      req.flash('danger', '邮箱不存在');
      return res.redirect('/email/list');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  } 
}