const express = require('express');
const router = express.Router();
const isLogin = require('../middlewares/login').isLogin;
const isSuperAdmin = require('../middlewares/admin').isSuperAdmin;
const city_route = require('./route/city_route');

// 添加城市
router.post('/add', isLogin, isSuperAdmin, city_route.add); //添加城市
router.get('/edit/:cityId',isLogin, isSuperAdmin,city_route.edit); // 获取城市信息
router.post('/edit/:cityId',isLogin, isSuperAdmin, city_route.process_edit); // 修改城市信息
router.get('/del/:cityId',isLogin, isSuperAdmin, city_route.delete); // 删除城市
module.exports = router;
