const express = require('express');
const router = express.Router();
const isLogin = require('../middlewares/login').isLogin;
const isSuperAdmin = require('../middlewares/admin').isSuperAdmin;
const accoicp_route = require('./route/accoicp_route');

router.get('/list',isLogin, isSuperAdmin,accoicp_route.list); // 获取账户列表
router.post('/add', isLogin, isSuperAdmin, accoicp_route.add); //添加账户
router.get('/edit/:accoId',isLogin, isSuperAdmin,accoicp_route.edit); // 获取账户信息
router.post('/edit/:accoId',isLogin, isSuperAdmin, accoicp_route.process_edit); // 修改账户信息
router.get('/del/:accoId',isLogin, isSuperAdmin, accoicp_route.delete); // 删除账户
module.exports = router;
