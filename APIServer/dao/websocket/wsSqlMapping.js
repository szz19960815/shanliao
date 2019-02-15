var wsSql = {
    match: 'update user_info set socket_id=? where userId=?',
    insert: 'INSERT INTO user_information_record(information_record_id,information_content,sender_id,receiver_id,send_at,information_status) VALUES(?,?,?,?,?,?)',
    update: 'update user_info set username=?,password=? where userId=?',
    delete: 'delete from user_info where userId=?',
    queryId: 'select * from user_information_record where sender_id=? and receiver_id=? order by send_at asc',
    query: 'select * from user_information_record where information_record_id=? limit 1'
};

module.exports = wsSql;