/**
 * Created by chuwk on 2018/10/20.
 */
// sql语句
var sqlMap = {
    // 用户
    login(username, password) {
        return "select * from user where user.username = '"+ username +"' and user.password = '"+ password +"'";
    },
    register: 'insert into user(username, password) values (?, ?)',
    update(username, password) {
        return "update user set user.password = '"+ password +"' where user.username = '"+ username +"'";
    },
    user: {
        get: 'select * from users',
        add: 'insert into users(id, name, sex) values (?, ?, ?)'
    }
}

module.exports = sqlMap
