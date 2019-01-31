var add = {
    // insert: 'INSERT INTO user_info(userId,username,password,register_at) VALUES(?,?,?,?)',
    // update: 'update user_info set username=?,password=? where userId=?',
    // delete: 'delete from user_info where userId=?',
    queryUserid: 'select * from user_info where userId=? limit 1',
    queryAll: 'select * from user_info',
    insertApply: 'INSERT INTO friendship_apply(apply_id,originator_id,originated_at,target_id,apply_status) VALUES(?,?,?,?,?)',
    queryRepeat: "SELECT * FROM friendship_apply WHERE originator_id = ? and target_id = ? and apply_status = 2",
    queryTarget: "SELECT * FROM friendship_apply WHERE target_id = ? order by apply_status desc, originated_at desc",
    queryApplyId: "SELECT * FROM friendship_apply WHERE apply_id = ? limit 1",
    agreeApply: "INSERT INTO user_friendship_relation(relation_id,userId,friend_id,apply_id,create_relation_at) VALUES(?,?,?,?,?)",
    updateApply: "update friendship_apply set apply_status=?,apply_handle_at=? where apply_id=?",
    queryRelationOriginator: "SELECT * FROM user_friendship_relation WHERE userId = ?",
};

module.exports = add;