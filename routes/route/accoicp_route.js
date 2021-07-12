const accoicp_service = require('../../service/accoicp_service');
//添加城市
exports.add = async(req, res) =>{
  let cityname = req.body.cityname;
  const firstletter = req.body.firstletter.toUpperCase();
  let city = await accoicp_service.findCityName(cityname);
  try {
    if(city){
      req.flash('danger', '城市已存在');
      return res.redirect('/');
    }else{
      await accoicp_service.create(cityname,firstletter);
      req.flash('success', '添加城市成功');
      return res.redirect('/');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('/');
  }
}

//获取城市信息
exports.edit = async(req,res) =>{
  const cityId = req.params.cityId;
  let city = await accoicp_service.findCityId(cityId);
  try {
    if(city){
      res.render('city/edit', {
        title: '修改城市 '+city.cityname,
        city: city,
      })  
    }else{
      req.flash('danger', '城市不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  } 
}
//修改城市信息
exports.process_edit = async(req, res) =>{
  let cityId = req.body.id;
  let cityname = req.body.cityname.trim();
  let firstletter = req.body.firstletter.trim();
  let subjectCount = req.body.subjectCount.trim();
  let city = await accoicp_service.findCityId(cityId);
  try {
    if(city){
      await accoicp_service.cityModify(cityId, cityname, firstletter,subjectCount);
      req.flash('success', '修改城市成功');
      return res.redirect('/');  
    }else{
      req.flash('danger', '城市不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  }

}

//删除城市
exports.delete = async(req, res) =>{
  const id = req.params.cityId;
  let city = await accoicp_service.findCityId(id);
  try {
    if(city){
      if(city.subjectCount == 0){
        await accoicp_service.deleteCityId(id);
        req.flash('success', '删除城市成功');
        return res.redirect('/');
      }else{
        req.flash('danger', '项目下有资质未删除');
        return res.redirect('back'); 
      }  
    }else{
      req.flash('danger', '城市不存在');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  } 

}