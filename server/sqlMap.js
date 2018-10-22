/**
 * Created by chuwk on 2018/10/20.
 */
// sql语句
var sqlMap = {
    // 用户
    user: {
        get: 'select * from users',
        add: 'insert into users(id, name, sex) values (?, ?, ?)'
    }
}

module.exports = sqlMap
