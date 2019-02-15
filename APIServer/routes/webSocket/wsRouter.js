var express = require('express');
var websocketDao = require('../../dao/websocket/websocketDao');
var router = express.Router();
var bodyParser = require('body-parser');
// create application/json parser   
var jsonParser = bodyParser.json();//获取JSON解析器中间件  
// create application/x-www-form-urlencoded parser   
var urlencodedParser = bodyParser.urlencoded({ extended: false });//url-encoded解析器  

router.get('/',function(req,res,next){
    res.send('respond with a resource');
});

/**
 * 根据用户id获取聊天信息
 * method: get
 * route:
 * /websocket/get-message
 * param:
 * userId  用户id
 * friendId    好友id
 */
router.get('/get-message', function(req,res,next){
    let reqParam = req.query || req.param;
    if(reqParam.userId == undefined || reqParam.userId == '' || reqParam.userId == null){
        res.send({ code: 0, msg: '用户id不能为空', data: {} });
    }else if(reqParam.friendId == undefined || reqParam.friendId == '' || reqParam.friendId == null){
        res.send({ code: 0, msg: '好友id不能为空', data: {} });
    }else{
        websocketDao.getMessage(reqParam,res,next);
    }
});

module.exports = router;