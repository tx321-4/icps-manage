const user_service = require('../service/user_service');

module.exports = function(app){
  app.get('/',async (req, res, next) => {
    let roles = await user_service.rolesfindAll();
    res.render('index', { 
      title: 'ICP备案',
      roles: roles
     });
  })
  app.use('/users', require('./users'));

}