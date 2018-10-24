/**
 * Created by chuwk on 2018/10/20.
 */
// node 后端服务器

const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const userApi = require('./api/userApi')
const loginApi = require('./api/loginApi')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/login', loginApi);


// 监听端口
app.listen(3000)
console.log('success listen at port:3000......')
