module.exports = {
  isSuperAdmin: function (req, res, next) {
    let user = req.session.user;
    let roleid = user.role.id
    if(roleid == 1) {
      next();
    }else {
      req.flash('danger', '你不是超级管理员');
      return res.redirect('back');
    }
  }
}