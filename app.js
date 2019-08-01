const express = require('express');
const path = require('path');
const route = require('./server/router/index.js');
const db = require('./server/db/index.js');
const config = require('./config/index.js');
const app = new express();

// 连接mongodb数据库
db(config.db);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// router
app.use('/', route);

// 静态资源文件存放位置
app.use('/static', express.static(__dirname + '/static'));

// 设置渲染模版引擎
app.set('view engine', 'pug');

app.listen(9999, () => {
  console.log('server is running on port : 9999');
});