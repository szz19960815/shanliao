
var user = {
    insert: 'INSERT INTO user_info(userId,username,password,register_at) VALUES(?,?,?,?)',
    update: 'update user_info set username=?,password=? where userId=?',
    delete: 'delete from user_info where userId=?',
    queryUsername: 'select * from user_info where username=? limit 1',
    queryAll: 'select * from user_info'
};

module.exports = user;