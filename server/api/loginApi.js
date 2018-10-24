var models = require('../db');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

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
        res.json({ 
            code: result.length ? 'success' : 'error', 
            message: result.length ? true : false 
        });
    })
});

// 注册
router.post('/register', (req, res) => {
    var params = req.body;
    var sql = $sql.register;
    conn.query(sql, [params.username, params.password], function(err, result) {
        if(err) {
            res.json({ code: 'error', message: '注册失败' });
        }
        res.json({
            code: 'success',
            message: '注册成功'
        });
    });
});

module.exports = router;