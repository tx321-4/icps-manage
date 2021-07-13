const express = require('express');
const router = express.Router();
const isLogin = require('../middlewares/login').isLogin;
const isSuperAdmin = require('../middlewares/admin').isSuperAdmin;
const email_route = require('./route/email_route');

router.get('/list',isLogin, isSuperAdmin,email_route.list); // 获取邮箱列表
router.post('/add', isLogin, isSuperAdmin, email_route.add); //添加邮箱
router.get('/edit/:emailId',isLogin, isSuperAdmin,email_route.edit); // 获取邮箱信息
router.post('/edit/:emailId',isLogin, isSuperAdmin, email_route.process_edit); // 修改邮箱信息
router.get('/del/:emailId',isLogin, isSuperAdmin, email_route.delete); // 删除邮箱
module.exports = router;
