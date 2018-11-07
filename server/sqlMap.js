/**
 * Created by chuwk on 2018/10/20.
 */
// sql语句
var sqlMap = {
    // 用户
    login(username, password) {
        return "select * from user where user.username = '"+ username +"' and user.password = '"+ password +"'";
    },
    register: 'insert into user(username, password, phone, email) values (?, ?, ?, ?)',
    user: {
        get: 'select * from user',
        add: 'insert into users(id, name, sex) values (?, ?, ?)'
    }
}

module.exports = sqlMap
