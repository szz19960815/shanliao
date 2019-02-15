var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
// create application/json parser   
var jsonParser = bodyParser.json();//获取JSON解析器中间件  
// create application/x-www-form-urlencoded parser   
var urlencodedParser = bodyParser.urlencoded({ extended: false });//url-encoded解析器  

// 路由信息（接口地址）开始
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes/users');
var addFriendsRouter = require('./routes/addFriends/add');
var friendsRouter = require('./routes/friendRoutes/friends');
var wsRouter = require('./routes/webSocket/wsRouter');

var app = express();

//引用socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);
//socket.io配置
// app.use(function(req,res,next){
//   res.io = io;
//   next();
// });
//引用dao层
var websocketDao = require('./dao/websocket/websocketDao');
io.on('connection',function(socket){
  console.log(socket.id)
  //确认连接已连接
  socket.on('sureConnect',function(data){
    websocketDao.matchUser(data,socket);
  });
  //接收聊天信息
  socket.on('message',function(data){
    websocketDao.message(data,socket);
    // socket.emit('remessage',data);
  });
  socket.on('test2',function(data){
    console.log(data);
    socket.emit('retest2',{data:"test2"});
  });
});

// 模板开始
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//模板结束

//访问路由设置，通过前面的路径访问后面的程序
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/add-friends',addFriendsRouter);
app.use('/friends',friendsRouter);
app.use('/websocket',wsRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 添加json解析
app.use(jsonParser);
app.use(urlencodedParser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//socket.io端口配置
var port = 3111;
app.set('port',port);
server.listen(port);

module.exports = app;
