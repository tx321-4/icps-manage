const tel_service = require('../../service/tel_service');

//获取手机号列表
exports.list = async(req,res) =>{
  const tels = await tel_service.findList();
  res.render('tel/list', {
    title: '手机号列表',
    tels: tels,
    length: tels.length
  });
  
}

//添加手机号
exports.add = async(req, res) =>{
  let cityname = req.body.cityname;
  const firstletter = req.body.firstletter.toUpperCase();
  let city = await tel_service.findCityName(cityname);
  try {
    if(city){
      req.flash('danger', '手机号已存在');
      return res.redirect('/');
    }else{
      await tel_service.create(cityname,firstletter);
      req.flash('success', '添加手机号成功');
      return res.redirect('/');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('/');
  }
}

//获取手机号信息
exports.edit = async(req,res) =>{
  const cityId = req.params.cityId;
  let city = await tel_service.findCityId(cityId);
  try {
    if(city){
      res.render('city/edit', {
        title: '修改手机号 '+city.cityname,
        city: city,
      })  
    }else{
      req.flash('danger', '手机号不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  } 
}
//修改手机号信息
exports.process_edit = async(req, res) =>{
  let cityId = req.body.id;
  let cityname = req.body.cityname.trim();
  let firstletter = req.body.firstletter.trim();
  let subjectCount = req.body.subjectCount.trim();
  let city = await tel_service.findCityId(cityId);
  try {
    if(city){
      await tel_service.cityModify(cityId, cityname, firstletter,subjectCount);
      req.flash('success', '修改手机号成功');
      return res.redirect('/');  
    }else{
      req.flash('danger', '手机号不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }

}

//删除手机号
exports.delete = async(req, res) =>{
  const id = req.params.cityId;
  let city = await tel_service.findCityId(id);
  try {
    if(city){
      if(city.subjectCount == 0){
        await tel_service.deleteCityId(id);
        req.flash('success', '删除手机号成功');
        return res.redirect('/');
      }else{
        req.flash('danger', '项目下有资质未删除');
        return res.redirect('back'); 
      }  
    }else{
      req.flash('danger', '手机号不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  } 

}