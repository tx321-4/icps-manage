const city_service = require('../../service/city_service');
const subject_service = require('../../service/subject_service');
const website_service = require('../../service/website_service');
const tel_service = require('../../service/tel_service');
const email_service = require('../../service/email_service');
// 获取当前城市下资质列表
exports.list = async(req, res) => {
  const cityId = req.params.cityId;
  let city = await city_service.findCityId(cityId);
  let subjects = await subject_service.findList(cityId);
  res.render('subject/list', {
    title: city.cityname,
    city: city,
    subjects: subjects,
    length: subjects.length
  });
}

// 添加所有资质
exports.all = async(req, res) =>{
  const subjects = await subject_service.findAll();
  res.render('subject/all', {
    title: '所有资质',
    subjects: subjects,
    length: subjects.length
  });
}

//添加资质 get
exports.add = async(req, res) =>{
  const cityId = req.params.cityId;
  let city = await city_service.findCityId(cityId);
  await res.render('subject/add', {
    title: city.cityname+'_添加资质',
    city: city
  });
}
//添加资质 post
exports.process_add = async(req, res) =>{
  let condition = {
    icp_num: req.body.icp_num
    };
  let subject = await subject_service.findOne(condition);
  try {
    if(subject){
      req.flash('danger', '资质已存在');
      return res.redirect('back');
    }else{

      await subject_service.create(req.body);
      req.flash('success', '添加资质成功');
      let url ='/subject/list/'+req.body.cityId;
      return res.redirect(url);
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }
}

//获取资质信息
exports.edit = async(req,res) =>{
  let condition = {
    id: req.params.subjectId
    };
  let subject = await subject_service.findOne(condition);
  try {
    if(subject){
      let city = await city_service.findCityId(subject.cityId);
      await res.render('subject/edit', {
        title: subject.subject_name+'_编辑资质',
        city: city,
        subject: subject
      });
    }else{
      req.flash('danger', '资质不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }
}
//修改资质信息
exports.process_edit = async(req, res) =>{
  let condition = {
    id: req.body.id
  };
  let subject = await subject_service.findOne(condition);
  try {
    if(subject){
      await subject_service.update(req.body);
      req.flash('success', '编辑资质成功');
      let url = '/subject/list/'+ req.body.cityId
      return res.redirect(url); 
    }else{
      req.flash('danger', '资质不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }
}

//获取资质信息
exports.detail = async(req,res) =>{
  let condition = {
    id: req.params.subjectId
    };
  try {
    let subject = await subject_service.findOne(condition);
    if(subject){

      let websites = await website_service.findList(subject.id);
      for (let i = 0; i < websites.length; i++) {
        let website_web1 = websites[i].website_web;
        websites[i].website_web = website_web1.replace(/,/g, '\r');
      }
      let tel1 = subject.subjectman_tel1;
      let tel2 = subject.subjectman_tel2;
      let tel3 = subject.subjectman_tel3;
      let email1 = subject.subjectman_email;
    
      let tel1_user = await tel_service.findTelNum(tel1);
      let tel2_user = await tel_service.findTelNum(tel2);
      let tel3_user = await tel_service.findTelNum(tel3);
      let email_user = await email_service.findEmailNum(email1);
      if(req.session.user.roleId !== 1 ){
        // 不是超级管理员
        let num = subject.subjectman_num;
    
        let newnum = num.replace(num.slice(6, 13), '*******');
        let newtel1 = tel1.replace(tel1.slice(3, 7), '****');
        let newemail1 = email1.replace(email1.slice(3, 7), '****');
    
        subject.subjectman_num = newnum;
        subject.subjectman_tel1 = newtel1;
        subject.subjectman_email = newemail1;
    
        if (tel2) {
          let newtel2 = tel2.replace(tel2.slice(3, 9), '*******');
          subject.subjectman_tel2 = newtel2;
        }
        if (tel3) {
          let newtel3 = tel3.replace(tel3.slice(3, 7), '****');
          subject.subjectman_tel3 = newtel3;
        }
      }
      let city = await city_service.findCityId(subject.cityId);
      await res.render('subject/detail', {
        title: subject.subject_name,
        city: city,
        websites: websites,
        subject: subject,
        tel1_user: tel1_user.tel_name,
        tel2_user: tel2_user.tel_name,
        tel3_user: tel3_user.tel_name,
        email_user: email_user.email_name
      });
    }else{
      req.flash('danger', '资质不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }
}
//删除资质
exports.delete = async(req, res) =>{
  let condition = {
    id: req.params.subjectId
    };
  let subject = await subject_service.findOne(condition);
  try {
    if(subject){
      if(subject.websiteCount == 0){
        await subject_service.deleteId(condition.id,subject.cityId);
        req.flash('success', '删除资质成功');
        let url = '/subject/list/'+ subject.cityId
        return res.redirect(url); 
      }else{
        req.flash('danger', '资质下有网站未删除');
        return res.redirect('back'); 
      }
        
    }else{
      req.flash('danger', '资质不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  } 
}