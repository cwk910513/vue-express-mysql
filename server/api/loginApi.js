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
 
// 登录
router.post('/query', (req, res) => {
    var params = req.body;
    var sql = $sql.login(params.username, params.password);
    conn.query(sql, function(err, result) {
        if (err) {
            res.json({ code: 'error', message: false });
        }
        var jwt = new JwtUtil();
        var token = jwt.generateToken();
        res.json({ 
            code: result.length ? 'success' : 'error', 
            message: result.length ? true : false,
            token: token
        });
    })
});

// 注册
router.post('/register', (req, res) => {
    var params = req.body;
    var sql = $sql.register;
    conn.query(sql, [params.username, params.password, params.phone, params.email], function(err, result) {
        if(err) {
            res.json({ code: 200, status: 'error', message: '注册失败' });
        }
        res.json({
            code: 200,
            status: 'success',
            message: '注册成功'
        });
    });
});

// 更新
router.post('/update', (req, res) => {
    var params = req.body;
    var sql = $sql.update(params.username, params.password);
    conn.query(sql, function(err, result) {
        if(err) {
            res.json({ code: 'error', message: '更新失败' });
        }
        res.json({ code: result.changedRows ? 'success' : 'error', message: result.changedRows ? '更新成功' : '更新失败' });
    })
})

module.exports = router;