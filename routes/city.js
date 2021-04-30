const express = require('express');
const router = express.Router();
const isLogin = require('../middlewares/login').isLogin;
const isSuperAdmin = require('../middlewares/admin').isSuperAdmin;
const city_route = require('./route/city_route');

// 添加城市
router.post('/add', isLogin, isSuperAdmin, city_route.add); //添加城市
module.exports = router;
