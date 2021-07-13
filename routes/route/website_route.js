const city_service = require('../../service/city_service');
const subject_service = require('../../service/subject_service');
const website_service = require('../../service/website_service');
const tel_service = require('../../service/tel_service');
const email_service = require('../../service/email_service');
//添加网站 get
exports.add = async(req, res) =>{
  let condition = {
    id: req.params.subjectId
    };
    let subject = await subject_service.findOne(condition);
    let city = await city_service.findCityId(subject.cityId);
    await res.render('website/add', {
    title: subject.subject_name+'_添加网站',
    city: city,
    subject: subject
  });
}
//添加网站 post
exports.process_add = async(req, res) =>{
  let condition = {
    website_num: req.body.website_num
    };
  let website = await website_service.findOne(condition);
  try {
    if(website){
      req.flash('danger', '网站已存在');
      return res.redirect('back');
    }else{

      await website_service.create(req.body);
      req.flash('success', '添加网站成功');
      let url ='/subject/detail/'+req.body.subjectId;
      return res.redirect(url);
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }
}

//获取网站信息
exports.edit = async(req,res) =>{
  let condition = {
    id: req.params.websiteId
    };
  let website = await website_service.findOne(condition);
  try {
    if(website){
      let condition2 = {
        id: website.subjectId
        };
      let subject = await subject_service.findOne(condition2);
      await res.render('website/edit', {
        title: website.website_url+'_编辑网站',
        subject: subject,
        website: website
      });
    }else{
      req.flash('danger', '网站不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }
}
//修改网站信息
exports.process_edit = async(req, res) =>{
  let condition = {
    id: req.body.id
  };
  let website = await website_service.findOne(condition);
  try {
    if(website){
      await website_service.update(req.body);
      req.flash('success', '编辑网站成功');
      let url = '/subject/detail/'+ req.body.subjectId
      return res.redirect(url); 
    }else{
      req.flash('danger', '网站不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }
}

//获取网站信息
exports.detail = async(req,res) =>{
  let condition = {
    id: req.params.websiteId
    };
  let website = await website_service.findOne(condition);
  try {
    if(website){
      let tel1 = website.website_tel1;
      let tel2 = website.website_tel2;
      let tel3 = website.website_tel3;
      let email1 = website.website_email;
      let website_web1 = website.website_web;
      website.website_web = website_web1.replace(/,/g, '\r');

      let website_url1 = website.website_url;
      website.website_url = website_url1.replace(/,/g, '\r');

      let tel1_user = await tel_service.findTelNum(tel1);
      let tel2_user = await tel_service.findTelNum(tel2);
      let tel3_user = await tel_service.findTelNum(tel3);
      let email_user = await email_service.findEmailNum(email1);
      if(req.session.user.roleId !== 1 ){
        // 不是超级管理员
        let num = website.websiteman_num;
    
        let newnum = num.replace(num.slice(6, 13), '*******');
        let newtel1 = tel1.replace(tel1.slice(3, 7), '****');
        let newemail1 = email1.replace(email1.slice(3, 7), '****');
    
        website.websiteman_num = newnum;
        website.website_tel1 = newtel1;
        website.website_email = newemail1;
    
        if (tel2) {
          let newtel2 = tel2.replace(tel2.slice(3, 9), '*******');
          website.website_tel2 = newtel2;
        }
        if (tel3) {
          let newtel3 = tel3.replace(tel3.slice(3, 7), '****');
          website.website_tel3 = newtel3;
        }
      }
      let condition2 = {
        id: website.subjectId
        };
      let subject = await subject_service.findOne(condition2);
      await res.render('website/detail', {
        title: website.website_url,
        subject: subject,
        website: website,
        tel1_user: tel1_user.tel_name,
        tel2_user: tel2_user.tel_name,
        tel3_user: tel3_user.tel_name,
        email_user: email_user.email_name
      });
    }else{
      req.flash('danger', '网站不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }
}
//删除网站
exports.delete = async(req, res) =>{
  let condition = {
    id: req.params.websiteId
    };
  let website = await website_service.findOne(condition);
  try {
    if(website){
        await website_service.deleteId(condition.id,website.subjectId);
        req.flash('success', '删除网站成功');
        let url = '/subject/detail/'+ website.subjectId
        return res.redirect(url); 
    }else{
      req.flash('danger', '网站不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  } 
}