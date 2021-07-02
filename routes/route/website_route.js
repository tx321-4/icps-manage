const city_service = require('../../service/city_service');
const subject_service = require('../../service/subject_service');
const website_service = require('../../service/website_service');

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
      let condition2 = {
        id: website.subjectId
        };
      let subject = await subject_service.findOne(condition2);
      await res.render('website/detail', {
        title: website.website_url,
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