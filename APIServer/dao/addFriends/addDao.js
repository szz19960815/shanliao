//dao/addDao.js
//实现添加好友的功能（数据库交互）
var mysql = require('mysql');
var $conf = require('../../config/db');
var $util = require('../../until/until');
var $sql = require('./addSqlMapping');
var $back = require('../../config/back');
var $uid = require('node-uuid');

//使用连接池提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

//向前台返回JSON的简单封装
var jsonWrite = $back.jsonWrite;

/**
 * 查找
 */
var search = function (req, res, next) {
    //获取前端参数
    let param = req;
    pool.getConnection(function (err, connection) {
        if (err) {
            jsonWrite(res, {}, 0, "查询失败");
            connection.release();
            return;
        }
        //建立连接模糊查询
        connection.query(`SELECT * FROM user_info where username like '%${param.searchKey}%' and username <> '${param.currentUser}'`, function (err, result) {
            if (err) {
                jsonWrite(res, {}, 0, "查询失败");
                connection.release();
                return;
            }
            if (result) {
                if (result.length <= 0) {
                    jsonWrite(res, {}, 0, "未找到该用户");
                    connection.release();
                    return;
                } else {
                    jsonWrite(res, result, 1, "查询成功");
                    connection.release();
                    return;
                }
            }
        });
    });
}

/**
 * 申请添加好友
 */
var applyAdd = function (req, res, next) {
    let param = req;
    pool.getConnection(function (err, connection) {
        if (err) {
            jsonWrite(res, {}, 0, "申请失败");
            connection.release();
            return;
        }
        // SELECT * FROM friendship_apply WHERE originator_id = ? and target_id = ?
        connection.query($sql.queryRepeat, [param.originator_id, param.target_id], function (err, result) {
            if (err) {
                jsonWrite(res, {}, 0, "申请失败");
                connection.release();
                return;
            }
            if (result) {
                if (result.length > 0) {
                    jsonWrite(res, {}, 2, "请勿重复申请");
                    connection.release();
                    return;
                } else {
                    connection.query($sql.queryRepeat, [param.target_id, param.originator_id], function (err, result) {
                        if (err) {
                            jsonWrite(res, {}, 0, "遭遇到了预料之外的错误");
                            connection.release();
                            return;
                        }
                        if (result) {
                            if (result.length > 0) {
                                jsonWrite(res, {}, 3, "对方已申请添加您为好友！");
                                connection.release();
                                return;
                            } else {
                                // SELECT * FROM user_friendship_relation WHERE userId = ?
                                connection.query($sql.queryRelationOriginator, [param.originator_id], function (err, result) {
                                    if (err) {
                                        jsonWrite(res, {}, 0, "遭遇到了预料之外的错误");
                                        connection.release();
                                        return;
                                    }
                                    if (result) {
                                        for (let i = 0; i < result.length; i++) {
                                            if (result[i].friend_id == param.target_id) {
                                                jsonWrite(res, {}, 2, "对方已经是您的好友");
                                                connection.release();
                                                return;
                                            }
                                        }
                                        let applyId = ($uid.v4()).replace(/-/g, "");
                                        let originatorId = param.originator_id;
                                        let originatedAt = (new Date().getTime()).toString();
                                        let targetId = param.target_id;
                                        //建立连接查询
                                        // INSERT INTO friendship_apply(apply_id,originator_id,originated_at,target_id) VALUES(?,?,?,?)
                                        connection.query($sql.insertApply, [applyId, originatorId, originatedAt, targetId, 2], function (err, result) {
                                            if (err) {
                                                jsonWrite(res, {}, 0, "申请失败");
                                                connection.release();
                                                return;
                                            }
                                            if (result) {
                                                jsonWrite(res, {}, 1, "申请成功，等待添加~");
                                                connection.release();
                                                return;
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });

                }
            }
        });
    });
}

/**
 * 获取申请列表
 */
var getApplyList = function (req, res, next) {
    let param = req;
    pool.getConnection(function (err, connection) {
        if (err) {
            jsonWrite(res, {}, 0, '获取失败');
            connection.release();
            return;
        }
        // SELECT * FROM friendship_apply WHERE originator_id = ?
        connection.query($sql.queryTarget, [param.target_id], function (err, result) {
            if (err) {
                jsonWrite(res, {}, 0, "获取失败");
                connection.release();
                return;
            }
            if (result) {
                let appList = result;
                connection.query($sql.queryAll, [], function (err, result) {
                    if (err) {
                        jsonWrite(res, {}, 0, "获取失败");
                        connection.release();
                        return;
                    }
                    if (result) {
                        for (let i = 0; i < appList.length; i++) {
                            for (let j = 0; j < result.length; j++) {
                                if (appList[i].originator_id == result[j].userId) {
                                    appList[i].username = result[j].username;
                                }
                            }
                        }
                        jsonWrite(res, appList, 1, "获取成功");
                        connection.release();
                        return;
                    }
                });
            }
        });
    });
}

/**
 * 同意申请
 */
var agreeApply = function (req, res, next) {
    let param = req;
    pool.getConnection(function (err, connection) {
        if (err) {
            jsonWrite(res, {}, 0, '添加好友失败');
            connection.release();
            return;
        }
        connection.query($sql.queryApplyId, [param.apply_id], function (err, result) {
            if (err) {
                jsonWrite(res, {}, 0, '添加好友失败');
                connection.release();
                return;
            }
            if (result) {
                if (result.length <= 0) {
                    jsonWrite(res, {}, 0, '添加好友失败');
                    connection.release();
                    return;
                } else {
                    let apply = result[0];
                    let relationId = ($uid.v4()).replace(/-/g, "");
                    let relationId2 = ($uid.v4()).replace(/-/g, '');
                    let createRelationAt = (new Date().getTime()).toString();
                    // INSERT INTO user_friendship_relation(relation_id,userId,friend_id,apply_id,create_relation_at) VALUES(?,?,?,?,?)
                    //以发起人为登录人添加好友信息
                    connection.query($sql.agreeApply, [relationId, apply.originator_id, apply.target_id, apply.apply_id, createRelationAt], function (err, result) {
                        if (err) {
                            jsonWrite(res, {}, 0, '添加好友失败');
                            connection.release();
                            return;
                        }
                        if (result) {
                            let handleAt = (new Date().getTime()).toString();
                            // update friendship_apply set apply_status=?,apply_handle_at=? where apply_id=?
                            connection.query($sql.updateApply, [1, handleAt, param.apply_id], function (err, result) {
                                if (err) {
                                    jsonWrite(res, {}, 0, '添加好友失败');
                                    connection.release();
                                    return;
                                }
                                if (result) {
                                    //以目标为登录人添加好友信息
                                    connection.query($sql.agreeApply, [relationId2, apply.target_id, apply.originator_id, apply.apply_id, createRelationAt], function (err, result) {
                                        if (err) {
                                            jsonWrite(res, {}, 0, '添加好友失败');
                                            connection.release();
                                            return;
                                        }
                                        if (result) {
                                            let handleAt = (new Date().getTime()).toString();
                                            // update friendship_apply set apply_status=?,apply_handle_at=? where apply_id=?
                                            connection.query($sql.updateApply, [1, handleAt, param.apply_id], function (err, result) {
                                                if (err) {
                                                    jsonWrite(res, {}, 0, '添加好友失败');
                                                    connection.release();
                                                    return;
                                                }
                                                if (result) {
                                                    jsonWrite(res, {}, 1, '添加好友成功');
                                                    connection.release();
                                                    return;
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    });
}

module.exports = {
    search,
    applyAdd,
    getApplyList,
    agreeApply,
}