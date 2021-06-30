const user_service = require('../service/user_service');
const city_service = require('../service/city_service');

const FristPin = ["A", "B", "C", "D", "E", "F", "G", "H",  "I","J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",  "V", "W", "X", "Y", "Z"];

module.exports = function(app){
  app.get('/',async (req, res, next) => {
    let roles = await user_service.rolesfindAll();
    let citys = await city_service.findAll();
    let cityJson = {};
    for (let i = 0; i < FristPin.length; i++) {  
      cityJson[FristPin[i]] = citys.filter(function (value) {
          return value.firstletter === FristPin[i];
      })
    }
    res.render('index', { 
      title: 'ICP备案',
      roles: roles,
      FristPin: FristPin,
      citys: cityJson
     });
  })
  app.use('/users', require('./users'));
  app.use('/city', require('./city'));

  // 404 page
  app.use(function (req, res) {
    if(!res.headersSent){
      res.status(404).render('404',{
        title: '404'
      })
    }
  })
}