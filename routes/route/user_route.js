exports.login = async(req, res) =>{
  await res.render('login',{
    title: '登录'
  })
}