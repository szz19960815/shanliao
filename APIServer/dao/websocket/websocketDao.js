// dao/websocketDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../config/db');
var $util = require('../../until/until');
var $sql = require('./wsSqlMapping');
var $uuid = require('node-uuid');//引入生成uid插件，$uuid.v1()基于时间戳生成,$uuid.v4()随机生成
var $back = require('../../config/back');
// var $md5 = require('md5');//引入md5对用户密码进行加密

//使用连接池提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

//向前台返回JSON的简单封装
var jsonWrite = $back.jsonWrite;

/**
 * 匹配用户的socketid
 */
var matchUser = function(data,socket){
    pool.getConnection(function(err,connection){
        if(err){
            socket.emit('rematch',{data:{},code:0,msg:'建立聊天失败'});
            connection.release();
            return;
        }
        // update user_info set socket_id=? where userId=?
        connection.query($sql.match,[socket.id,data.currentUser],function(err,result){
            if(err){
                socket.emit('rematch',{data:{},code:0,msg:'建立聊天失败'});
                connection.release();
                return;
            }
            if(result){
                socket.emit('rematch',{data:result,code:1,msg:'建立聊天成功'});
                connection.release();
                return;
            }
        });
    });
}

/**
 * 接收到新的消息
 */
var message = function(data,socket){
    pool.getConnection(function(err, connection){
        if (err) {
            // jsonWrite(res, {}, 0, "发送失败");
            socket.emit('remessage',{data:{},code:0,msg:'发送失败'});
            connection.release();
            return;
        }
        //随机生成uid
        let uid = ($uuid.v4()).replace(/-/g,"");
        let sendAt = (new Date().getTime()).toString();
        // INSERT INTO user_information_record(information_record_id,information_content,sender_id,receiver_id,send_at,information_status) VALUES(?,?,?,?,?,?)
        connection.query($sql.insert,[uid,data.information,data.senderId,data.receiverId,sendAt,1],function(err,result){
            if (err) {
                // jsonWrite(res, {}, 0, "发送失败");
                socket.emit('remessage',{data:{},code:0,msg:'发送失败'});
                connection.release();
                return;
            }
            if(result){
                // jsonWrite(res, {}, 1, "发送成功");
                // select * from user_information_record where information_record_id=? limit 1
                connection.query($sql.query,[uid],function(err,result){
                    if (err) {
                        // jsonWrite(res, {}, 0, "发送失败");
                        socket.emit('remessage',{data:{},code:0,msg:'出现未知错误请联系管理员'});
                        connection.release();
                        return;
                    }
                    if(result){
                        socket.emit('remessage',{data:result[0],code:1,msg:'发送成功'});
                        connection.release();
                        return;
                    }
                })
            }
        });
    });
}

/**
 * 获取聊天信息
 */
var getMessage = function(param,res,next){
    pool.getConnection(function(err,connection){
        if (err) {
            jsonWrite(res, {}, 0, "获取失败");
            connection.release();
            return;
        }
        // select * from user_information_record where sender_id=? and receiver_id=?
        connection.query($sql.queryId,[param.userId,param.friendId],function(err,result){
            if(err){
                jsonWrite(res, {}, 0, "获取失败");
                connection.release();
                return;
            }
            if(result){
                let len = result.length;
                for(let i = 0; i < len; i++){
                    if(result[i].sender_id == param.userId){
                        result[i].type = 'send';
                    }
                    if(result[i].receiver_id == param.userId){
                        result[i].type = 'receive';
                    }
                }
                jsonWrite(res, result, 1, "获取成功");
                connection.release;
                return;
            }
        });
    });
}

module.exports = {
    matchUser,
    message,
    getMessage
};