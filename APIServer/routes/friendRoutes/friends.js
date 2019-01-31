var express = require('express');
var friendsDao = require('../../dao/friends/friendsDao');
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
 * 获取好友列表
 * method: get
 * route:
 * /friends/get-friends-list
 * param:
 * userId   当前用户id  必填
 */
router.get('/get-friends-list',function(req,res,next){
    let reqParam = req.query || req.param;
    if(reqParam.userId == undefined || reqParam.userId == '' || reqParam.userId == null){
        res.send({ code: 0, msg: '当前用户id不能为空', data: {} });
    }else{
        friendsDao.getFriendsList(reqParam,res,next);
    }
});

module.exports = router;