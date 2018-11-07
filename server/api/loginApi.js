let models = require('../db');
let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let $sql = require('../sqlMap');

// 加密模块(自带模块)
const crypto = require("crypto");
// 生成token模块
const JwtUtil = require('../jwt/jwt');

// 连接数据库
let conn = mysql.createConnection(models.mysql);
conn.connect();

let jsonWrite = function(res, ret) {
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
router.post('/login', (req, res) => {
    let params = req.body;
    let password = params.password;
    let md5 = crypto.createHash('md5');
    let md5Password = md5.update(password).digest('hex');
    let sql = $sql.login(params.username, md5Password);
    conn.query(sql, function(err, result) {
        if (err) {
            res.json({ code: 'error', message: false });
        }
        let jwt = new JwtUtil();
        let token = jwt.generateToken();
        res.json({ 
            code: result.length ? 'success' : 'error', 
            message: result.length ? true : false,
            token: token
        });
    })
});

// 注册
router.post('/register', (req, res) => {
    let params = req.body;
    let sql = $sql.register;
    let password = params.password;
    let md5 = crypto.createHash('md5');
    let md5Password = md5.update(password).digest('hex');
    conn.query(sql, [params.username, md5Password, params.phone, params.email], function(err, result) {
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
    let params = req.body;
    let sql = $sql.update(params.username, params.password);
    conn.query(sql, function(err, result) {
        if(err) {
            res.json({ code: 'error', message: '更新失败' });
        }
        res.json({ code: result.changedRows ? 'success' : 'error', message: result.changedRows ? '更新成功' : '更新失败' });
    })
})

module.exports = router;