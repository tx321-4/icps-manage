const email_service = require('../../service/email_service');

//获取邮箱列表
exports.list = async(req,res) =>{
  const tels = await email_service.findList();
  res.render('tel/list', {
    title: '邮箱列表',
    tels: tels,
    length: tels.length
  });
  
}

//添加邮箱
exports.add = async(req, res) =>{
  let cityname = req.body.cityname;
  const firstletter = req.body.firstletter.toUpperCase();
  let city = await email_service.findCityName(cityname);
  try {
    if(city){
      req.flash('danger', '邮箱已存在');
      return res.redirect('/');
    }else{
      await email_service.create(cityname,firstletter);
      req.flash('success', '添加邮箱成功');
      return res.redirect('/');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('/');
  }
}

//获取邮箱信息
exports.edit = async(req,res) =>{
  const cityId = req.params.cityId;
  let city = await email_service.findCityId(cityId);
  try {
    if(city){
      res.render('city/edit', {
        title: '修改邮箱 '+city.cityname,
        city: city,
      })  
    }else{
      req.flash('danger', '邮箱不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  } 
}
//修改邮箱信息
exports.process_edit = async(req, res) =>{
  let cityId = req.body.id;
  let cityname = req.body.cityname.trim();
  let firstletter = req.body.firstletter.trim();
  let subjectCount = req.body.subjectCount.trim();
  let city = await email_service.findCityId(cityId);
  try {
    if(city){
      await email_service.cityModify(cityId, cityname, firstletter,subjectCount);
      req.flash('success', '修改邮箱成功');
      return res.redirect('/');  
    }else{
      req.flash('danger', '邮箱不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }

}

//删除邮箱
exports.delete = async(req, res) =>{
  const id = req.params.cityId;
  let city = await email_service.findCityId(id);
  try {
    if(city){
      if(city.subjectCount == 0){
        await email_service.deleteCityId(id);
        req.flash('success', '删除邮箱成功');
        return res.redirect('/');
      }else{
        req.flash('danger', '项目下有资质未删除');
        return res.redirect('back'); 
      }  
    }else{
      req.flash('danger', '邮箱不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  } 

}