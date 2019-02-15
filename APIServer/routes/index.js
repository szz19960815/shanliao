var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //只有当前页面可以获得
  // res.io.on('connection', function(socket) {
  //   socket.emit('news', {
  //     hello: 'world'
  //   });
  //   socket.on('my other event', function(data) {
  //     console.log(data);
  //   });
  // });
  //所有页面都可以获得
  // var io = require("../app").io;
  // io.emit("news",{hello:"myworld"});
  // res.render("pclogin.ejs", {});
  // res.render('index', { title: 'Express' });
});

module.exports = router;
