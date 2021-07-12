const express = require('express');
const router = express.Router();
const isLogin = require('../middlewares/login').isLogin;
const isSuperAdmin = require('../middlewares/admin').isSuperAdmin;
const tel_route = require('./route/tel_route');

router.get('/list',isLogin, isSuperAdmin,tel_route.list); // 获取手机号列表
router.post('/add', isLogin, isSuperAdmin, tel_route.add); //添加手机号
router.get('/edit/:telId',isLogin, isSuperAdmin,tel_route.edit); // 获取手机号信息
router.post('/edit/:telId',isLogin, isSuperAdmin, tel_route.process_edit); // 修改手机号信息
router.get('/del/:telId',isLogin, isSuperAdmin, tel_route.delete); // 删除手机号
module.exports = router;
