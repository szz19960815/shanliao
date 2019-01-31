// dao/friendsDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../config/db');
var $util = require('../../until/until');
var $sql = require('./friendsMapping');
var $back = require('../../config/back');
var $uuid = require('node-uuid');//引入生成uid插件，$uuid.v1()基于时间戳生成,$uuid.v4()随机生成
var $md5 = require('md5');//引入md5对用户密码进行加密
var async = require('async');

//使用连接池提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

//向前台返回JSON的简单封装
var jsonWrite = $back.jsonWrite;

/**
 * 获取好友列表
 */
var getFriendsList = function(req,res,next){
    let param = req;
    pool.getConnection(function(err,connection){
        if (err) {
            jsonWrite(res, {}, 0, "获取好友列表失败1");
            return;
        }
        //建立连接模糊查询
        // select * from user_friendship_relation where userId=?
        connection.query($sql.queryUserid, [param.userId], function (err, result) {
            if (err) {
                jsonWrite(res, {}, 0, "获取好友列表失败2");
                connection.release();
                return;
            }
            if (result) {
                if (result.length <= 0) {
                    jsonWrite(res, {}, 0, "您目前还没有任何好友哦§(*￣▽￣*)§~");
                    connection.release();
                    return;
                } else {
                    // for(let i = 0; i < result.length; i++){
                    //     connection.query($sql.queryUser, [result[i].friend_id], function(err,result){
                    //         if (err) {
                    //             jsonWrite(res, {}, 0, "获取好友列表失败");
                    //             connection.release();
                    //             return;
                    //         }
                    //         if(result){
                    //             friendsList.push(result[0]);
                    //         }
                    //     });
                    // }
                    async.map(result,function(item,callback){
                        connection.query($sql.queryUser, [item.friend_id],function(err,result){
                            if (err) {
                                console.log('\n',err);
                                jsonWrite(res, {}, 0, "获取好友列表失败3");
                                connection.release();
                                return;
                            }
                            if(result){
                                callback(err,result[0]);
                            }
                        });
                    },function(err,result){
                        if (err) {
                            jsonWrite(res, {}, 0, "获取好友列表失败4");
                            connection.release();
                            return;
                        }
                        if(result){
                            jsonWrite(res, result, 1, "获取好友列表成功");
                            connection.release();
                            return;
                        }
                    });
                }
            }
        });
    });
}

module.exports = {
    getFriendsList,

};