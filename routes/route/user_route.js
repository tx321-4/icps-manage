
 const md5 = require('md5-node');
 const user_service = require('../../service/user_service');

//登录
exports.login = async(req, res) =>{
  let username = req.body.username;
  let password = req.body.password;
  if(!username){
    req.flash('danger', '请输入账户');
    return res.redirect('back');
  }else if(!password){
    req.flash('danger', '请输入密码');
    return res.redirect('back');
  }
  const user = await user_service.findUserName(username);
  try {
    if(user) {
      // 检查密码是否匹配
      if (md5(password) !== user.password) {
        req.flash('danger', '密码错误');
        return res.redirect('back');
      } else {
        req.flash('success', '登录成功');
        delete user.password;
        req.session.user = user;
        await res.redirect('/');
      }
    } else {
      req.flash('danger','账户不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('error', error.message);
    return res.redirect('back');
  }
  return res.redirect('back');
}

// 注册
exports.register = async(req, res) =>{
  let username = req.body.username;
  let password = req.body.password;
  let roleId = req.body.roleId;
  if(!username){
    req.flash('danger', '请输入账户');
    return res.redirect('back');
  }else if(!password){
    req.flash('danger', '请输入密码');
    return res.redirect('back');
  }else if(!roleId){
    req.flash('danger', '请选择角色');
    return res.redirect('back');
  }else{

  }
  let user = await user_service.findUserName(username);
  try {
    if(user){
      req.flash('danger', '用户已存在');
      return res.redirect('back');
    }else{
      await user_service.register(username, md5(password), roleId);
      req.flash('success', '注册成功');
      return res.redirect('/');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }
}

exports.logout = async(req, res) => {
  //清空session中用户信息
  req.session.user = null;
  req.flash('success', '退出成功');
  await res.redirect('/');
}