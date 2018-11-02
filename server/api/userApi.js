var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

const JwtUtil = require('../jwt/jwt');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

// 获取所有用户数据
router.use('/getUsers', (req, res) => {
    var sql = $sql.user.get;
    let token = req.headers.token;
    let jwt = new JwtUtil(token);
    let result = jwt.verifyToken();
    console.log('******* 是否有token ********');
    console.log(result);
    conn.query(sql, function(err, result) {
        if(err) {
            console.log(err);
        }
        if(result) {
            jsonWrite(res, result);
        }
    })
});

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.username, params.age], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;