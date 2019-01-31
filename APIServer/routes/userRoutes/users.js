var express = require('express');
var userDao = require('../../dao/user/userDao');
var router = express.Router();
var bodyParser = require('body-parser');
// create application/json parser   
var jsonParser = bodyParser.json();//获取JSON解析器中间件  
// create application/x-www-form-urlencoded parser   
var urlencodedParser = bodyParser.urlencoded({ extended: false });//url-encoded解析器  

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 * 用户注册
 * method: post
 * route:
 * /users/register
 * param:
 * username   用户名  必填
 * pass   用户密码  必填
 * repass   用户确认密码  必填
 */
router.post('/register', jsonParser, function (req, res, next) {
  let reqParam = req.body;
  if (reqParam.username == '' || reqParam.username == null || reqParam.username == undefined) {
    res.send({ code: 0, msg: '用户名不能为空', data: {} });
  } else if (reqParam.pass == '' || reqParam.pass == null || reqParam.pass == undefined) {
    res.send({ code: 0, msg: '用户密码不能为空', data: {} });
  } else if (reqParam.repass == '' || reqParam.repass == null || reqParam.repass == undefined) {
    res.send({ code: 0, msg: '请确认密码', data: {} });
  } else if (reqParam.pass != reqParam.repass) {
    res.send({ code: 0, msg: '两次输入密码不一致', data: {} });
  } else {
    userDao.register(reqParam, res, next);
  }
});

/**
 * 用户登录
 * method: post
 * route:
 * /users/login
 * param:
 * username   用户名  必填
 * password   用户密码  必填
 */
router.post('/login', jsonParser, function (req, res, next) {
  let reqParam = req.body;
  if (reqParam.username == '' || reqParam.username == null || reqParam.username == undefined) {
    res.send({ code: 0, msg: '用户名不能为空', data: {} });
  } else if (reqParam.pass == '' || reqParam.pass == null || reqParam.pass == undefined) {
    res.send({ code: 0, msg: '用户密码不能为空', data: {} });
  } else {
    userDao.login(reqParam, res, next);
  }
});

module.exports = router;
