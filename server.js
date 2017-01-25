var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonfile = require('jsonfile');
var file = 'profiledata.json'

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

router.get("/searchdoctors",function(req,res){
  res.sendFile(path + "searchdoctors.html");
});

router.get("/eligible",function(req,res){
  res.sendFile(path + "eligible.html");
});

router.get("/eligiblecoverage",function(req,res){
  res.sendFile(path + "eligiblecoverage.html");
});

//tt
router.get("/estimatecost",function(req,res){
  res.sendFile(path + "costestimate.html");
});

router.get("/makepayment",function(req,res){
  res.sendFile(path + "makepayment.html");
});

router.get("/analytics",function(req,res){
  res.sendFile(path + "analytics.html");
});

router.get("/test",function(req,res){
  res.sendFile(path + "test.html");
});

router.get("/index",function(req,res){
  res.sendFile(path + "index.html");
});

app.post("/signup",urlencodedParser,function(req,res){
	var fname = req.body.fname;
	var lname= req.body.lname;
	var emailaddr = req.body.emailaddr;
	var passwrd = req.body.passwrd;
	
	var masterfile = {};
	masterfile.members = [];
	
//Read from current File

	var obj = jsonfile.readFileSync(file)
	retObj = JSON.parse(obj);
	//console.log(obj)	
	
	var x = 0;
	for (i = 0, ilen = retObj.members.length; i<ilen; i++){
		
		if (retObj.members[i].emailaddr == emailaddr) {
			x = 1;
		}
		
	}
//		console.log("AFTER CHECK")
		
		if(x == 0) {
			//console.log("NOT equal")
			var memberfile = {}; //NEW Object
			memberfile.fname = fname;
			memberfile.lname = lname;
			memberfile.emailaddr = emailaddr;
			memberfile.passwrd = passwrd;
			memberfile.providername = req.body.providername;
			memberfile.memberid = req.body.memberid;
			
			retObj.members.push(memberfile);
	
			var jsonString = JSON.stringify(retObj);
	
			jsonfile.writeFile(file,jsonString)
			
			res.sendFile(path + "index.html");
		}
		else {
			res.sendFile(path + "/");
		}
  
	
}
);

app.post("/login",urlencodedParser,function(req,res){
	var emailaddr = req.body.email;
	var passwrd = req.body.password;
	
	var obj = jsonfile.readFileSync(file)
	retObj = JSON.parse(obj);
	
	var x = 0;
	for (i = 0, ilen = retObj.members.length; i<ilen; i++){
		
		//console.log("From the File " + retObj.members[i].emailaddr)
		//console.log("ScrennPW= " + emailaddr)
		
		if (retObj.members[i].emailaddr == emailaddr) {
			if (retObj.members[i].passwrd == passwrd) {
				x = 1;
			}
		}
		
	}
	
	if(x == 0) {
		// user not found - send back to login
		res.sendFile(path + "/");
	}
	else {
		// user was found - send back to login
		res.sendFile(path + "index.html");
	}
  
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
