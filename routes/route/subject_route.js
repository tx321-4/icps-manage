const city_service = require('../../service/city_service');
const subject_service = require('../../service/subject_service');
const website_service = require('../../service/website_service');

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
      let city = await city_service.findCityId(subject.cityId);
      await res.render('subject/detail', {
        title: subject.subject_name,
        city: city,
        websites: websites,
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