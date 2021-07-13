const express = require('express');
const router = express.Router();
const isLogin = require('../middlewares/login').isLogin;
const isSuperAdmin = require('../middlewares/admin').isSuperAdmin;
const website_route = require('./route/website_route');

// 添加资质

router.get('/detail/:websiteId',isLogin, website_route.detail); // 获取网站详情

router.get('/add/:subjectId', isLogin, isSuperAdmin, website_route.add); //添加网站 get
router.post('/add', isLogin, isSuperAdmin, website_route.process_add); //添加网站 post
router.get('/edit/:websiteId',isLogin, isSuperAdmin,website_route.edit); // 获取网站信息
router.post('/edit',isLogin, isSuperAdmin, website_route.process_edit); // 修改网站信息
router.get('/del/:websiteId',isLogin, isSuperAdmin, website_route.delete); // 删除网站
module.exports = router;
