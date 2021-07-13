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
  let tel_num = req.body.tel_num.trim();
  const tel_name = req.body.tel_name.trim();
  let tel = await tel_service.findTelNum(tel_num);
  try {
    if(tel){
      req.flash('danger', '手机号已存在');
      return res.redirect('/tel/list');
    }else{
      await tel_service.create(tel_num,tel_name);
      req.flash('success', '添加手机号成功');
      return res.redirect('/tel/list');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('/tel/list');
  }
}

//获取手机号信息
exports.edit = async(req,res) =>{
  const id = req.params.telId;
  let tel = await tel_service.findTelId(id);
  try {
    if(tel){
      res.render('tel/edit', {
        title: '修改手机号-'+tel.tel_num,
        tel: tel,
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
  let telId = req.body.id;
  let tel_num = req.body.tel_num.trim();
  let tel_name = req.body.tel_name.trim();
  let tel = await tel_service.findTelId(telId);
  try {
    if(tel){
      await tel_service.TelModify(telId, tel_num, tel_name);
      req.flash('success', '修改手机号成功');
      return res.redirect('/tel/list');  
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
  const id = req.params.telId;
  let tel = await tel_service.findTelId(id);
  try {
    if(tel){
        await tel_service.deleteTelId(id);
        req.flash('success', '删除手机号成功');
        return res.redirect('/tel/list');
       
    }else{
      req.flash('danger', '手机号不存在');
      return res.redirect('/tel/list');
    }
  } catch (error) {
    req.flash('danger', error.message);
    return res.redirect('back');
  } 
}