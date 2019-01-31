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

var app = express();

// 模板开始
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//模板结束

//访问路由设置，通过前面的路径访问后面的程序
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/add-friends',addFriendsRouter);
app.use('/friends',friendsRouter);

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



module.exports = app;
