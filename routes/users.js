const express = require('express');
const router = express.Router();
const user_route = require('./route/user_route');

router.post('/login', user_route.login);//登录
router.post('/register',user_route.register) // 注册
router.get('/logout',user_route.logout) // 退出

module.exports = router;
