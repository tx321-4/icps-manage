module.exports = {
  isLogin: function (req, res, next) {
    if (!req.session.user) {
      req.flash('danger', '未登录');
      return res.redirect('/');
    }
    next();
  }
}