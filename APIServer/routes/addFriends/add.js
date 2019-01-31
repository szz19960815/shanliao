var express = require('express');
var addDao = require('../../dao/addFriends/addDao');
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
 * 根据用户名搜索用户
 * method: get
 * route:
 * /add-friends/search-user
 * param:
 * currentUser  当前用户
 * searchKey    搜索关键字
 */
router.get('/search-user', function(req,res,next){
    let reqParam = req.query || req.param;
    if(reqParam.currentUser == undefined || reqParam.currentUser == '' || reqParam.currentUser == null){
        res.send({ code: 0, msg: '当前用户id不能为空', data: {} });
    }else if(reqParam.searchKey == undefined || reqParam.searchKey == '' || reqParam.searchKey == null){
        res.send({ code: 0, msg: '请输入搜索关键字', data:{}});
    }else{
        addDao.search(reqParam,res,next);
    }
});

/**
 * 申请添加好友
 * method: post
 * route:
 * /add-friends/apply-add
 * param:
 * originator_id  发起人id
 * target_id    被申请人id
 */
router.post('/apply-add', jsonParser, function(req,res,next){
    let reqParam = req.body;
    if(reqParam.originator_id == undefined || reqParam.originator_id == '' || reqParam.originator_id == null){
        res.send({code: 0, msg: '发起人id不能为空',data: {}});
    }else if(reqParam.target_id == undefined || reqParam.target_id == '' || reqParam.target_id == null){
        res.send({code: 0, msg: '被申请人id不能为空', data: {}});
    }else{
        addDao.applyAdd(reqParam,res,next);
    }
});

/**
 * 获取申请列表
 * method: get
 * route:
 * /add-friends/get-apply-list
 * param:
 * target_id  发起人id
 */
router.get('/get-apply-list', function(req,res,next){
    let reqParam = req.query || req.param;
    if(reqParam.target_id == undefined || reqParam.target_id == '' || reqParam.target_id == null){
        res.send({code: 0, msg: '被申请人id不能为空', data: {}});
    }else{
        addDao.getApplyList(reqParam,res,next);
    }
});

/**
 * 同意申请
 * method: post
 * route:
 * /add-friends/agree-apply
 * param:
 * apply_id  好友申请id
 */
router.post('/agree-apply', jsonParser, function(req,res,next){
    let reqParam = req.body;
    if(reqParam.apply_id == undefined || reqParam.apply_id == '' || reqParam.apply_id == null){
        res.send({code: 0, msg: '好友申请id不能为空', data: {}});
    }else{
        addDao.agreeApply(reqParam,res,next);
    }
});

module.exports = router;