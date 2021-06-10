var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/home', function(req, res, next) {
  res.render('home');
});


router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/master', function(req, res, next) {
  res.render('master');
});

router.get('/form', function(req, res, next) {
  res.render('form');
});

router.post('/form-process', function(req, res, next) {
  
  var name = req.body.text1;
  var age = parseInt(req.body.text2);
  var a= parseInt(req.body.text3);
  var b= parseInt(req.body.text4);
  var c = a + b;
  var msg = "";
  var mycolor = "";
  if(age>18)
  {
    msg = "Eligible for driving License";
    mycolor = "green";
  }
  else{
    msg = "Not Eligible for driving license";
    mycolor = "Red";
  }
  console.log(req.body);
  console.log("Name: " + a + "Age:" +b);
  res.render('ans',{name:name,age:age,a:a,b:b,c:c,msg:msg,mycolor:mycolor});
});

module.exports = router;
