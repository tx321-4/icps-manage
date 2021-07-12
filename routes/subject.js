const express = require('express');
const router = express.Router();
const isLogin = require('../middlewares/login').isLogin;
const isSuperAdmin = require('../middlewares/admin').isSuperAdmin;
const subject_route = require('./route/subject_route');

// 添加资质
router.get('/all', isLogin, isSuperAdmin, subject_route.all); //添加所有资质
router.get('/list/:cityId',isLogin, isSuperAdmin,subject_route.list); // 获取当前城市下资质列表
router.get('/add/:cityId', isLogin, isSuperAdmin, subject_route.add); //添加资质 get
router.post('/add', isLogin, isSuperAdmin, subject_route.process_add); //添加资质 post
router.get('/edit/:subjectId',isLogin, isSuperAdmin,subject_route.edit); // 获取资质信息
router.post('/edit',isLogin, isSuperAdmin, subject_route.process_edit); // 修改资质信息
router.get('/detail/:subjectId',isLogin, isSuperAdmin,subject_route.detail); // 获取资质详情
router.get('/del/:subjectId',isLogin, isSuperAdmin, subject_route.delete); // 删除资质
module.exports = router;
