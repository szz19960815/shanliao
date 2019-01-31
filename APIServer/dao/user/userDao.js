// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../config/db');
var $util = require('../../until/until');
var $sql = require('./userSqlMapping');
var $uuid = require('node-uuid');//引入生成uid插件，$uuid.v1()基于时间戳生成,$uuid.v4()随机生成
var $md5 = require('md5');//引入md5对用户密码进行加密

//使用连接池提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

//向前台返回JSON的简单封装
var jsonWrite = function (res, ret, code, msg) {
    if (typeof ret === 'undefined') {
        res.json({
            code: code,
            msg: msg,
            data: {}
        });
    } else {
        res.json({
            code: code,
            msg: msg,
            data: ret
        });
    }
}

/**
 * 用户注册
 */
var add = function (req, res, next) {
    //获取前端参数
    let param = req;
    if (!(/^[a-zA-Z0-9]{6,18}$/.test(param.username))) {
        jsonWrite(res, {}, 0, "用户名为6至18位的字母或数字（区分大小写）");
        return;
    }
    if (!(/^[a-zA-Z0-9]{6,16}$/.test(param.pass))) {
        jsonWrite(res, {}, 0, "密码为6至16位的字母或数字（区分大小写）");
        return;
    }
    //建立连接，查询
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryUsername, [param.username], function (err, result) {
            if (err) {
                jsonWrite(res, {}, 0, "注册失败");
                connection.release();
                return;
            }
            if (result) {
                if (result.length != 0) {
                    jsonWrite(res, {}, 0, '用户名已存在');
                    connection.release();
                    return;
                } else {
                    //随机生成uid
                    var uid = ($uuid.v4()).replace(/-/g,"");
                    var username = param.username;
                    //密码使用md5双重加密
                    var password = $md5($md5(param.pass).substr(8, 6) + 224 + $md5(param.pass) + $md5('szz'));
                    var register_at = (new Date().getTime()).toString();
                    //建立连接，向表中插入值
                    // INSERT INTO user_info(userId,username,password) VALUES(?,?,?,?)
                    connection.query($sql.insert, [uid, username, password,register_at], function (err, result) {
                        if (err) {
                            jsonWrite(res, {}, 0, "注册失败");
                            connection.release();
                            return;
                        }
                        if (result) {
                            jsonWrite(res, {}, 1, '注册成功,请登录！');
                            connection.release();
                            return;
                        }
                    });
                }
            }
        });
    });
}

/**
 * 用户登录
 */
var match = function (req, res, next) {
    let param = req;
    if (!(/^[a-zA-Z0-9]{6,18}$/.test(param.username))) {
        jsonWrite(res, {}, 0, "用户名为6至18位的字母或数字（区分大小写）");
        return;
    }
    if (!(/^[a-zA-Z0-9]{6,16}$/.test(param.pass))) {
        jsonWrite(res, {}, 0, "密码为6至16位的字母或数字（区分大小写）");
        return;
    }
    //建立连接查询
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryUsername, [param.username], function (err, result) {
            if (err) {
                if (err) {
                    jsonWrite(res, {}, 0, "登录失败");
                    connection.release();
                }
            }
            if (result) {
                var username = param.username;
                //密码使用md5双重加密
                var password = $md5($md5(param.pass).substr(8, 6) + 224 + $md5(param.pass) + $md5('szz'));
                result = result[0];
                if(!result.username === username){
                    jsonWrite(res, {}, 0, "登录失败，用户名错误！");
                    connection.release();
                    return;
                }
                if(!result.password === password){
                    jsonWrite(res, {}, 0, "登录失败，密码错误!");
                    connection.release();
                    return;
                }
                jsonWrite(res, {userId:result.userId,username:result.username}, 1, "登录成功！");
                connection.release();
                return;
            }
        });
    });
}

module.exports = {
    register: add,
    login: match,
}