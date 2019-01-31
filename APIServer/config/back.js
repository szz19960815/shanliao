module.exports ={
    jsonWrite:function (res, ret, code, msg) {
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
}