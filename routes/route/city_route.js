const city_service = require('../../service/city_service');

exports.add = async(req, res) =>{
  let cityname = req.body.cityname;
  const firstletter = req.body.firstletter.toUpperCase();
  let city = await city_service.findCityName(cityname);
  try {
    if(city){
      req.falsh('danger', '城市已存在');
      return res.redirect('/');
    }else{
      await city_service.create(cityname,firstletter);
      req.flash('success', '添加城市成功');
      return res.redirect('/');
    }
  } catch (error) {
    req.falsh('danger', error.message);
    return res.redirect('/');
  }
}