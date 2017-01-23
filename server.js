var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "login.html");
});

router.get("/searchdocs",function(req,res){
  res.sendFile(path + "searchdocs.html");
});

router.get("/eligible",function(req,res){
  res.sendFile(path + "eligible.html");
});

router.get("/eligiblecoverage",function(req,res){
  res.sendFile(path + "eligiblecoverage.html");
});

router.get("/test",function(req,res){
  res.sendFile(path + "test.html");
});

router.get("/index",function(req,res){
  res.sendFile(path + "index.html");
});

// include model/main
require('./model/main')(app);
require('./model/searchdocs')(app);
require('./model/tt')(app,router);

//require('./model/main')(app,router);

app.use(express.static('public'))
//app.use(express.static('public2'))
app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

var port = process.env.PORT || 3000;

app.listen(port,function(){
  console.log("Live at Port " + port);
});
