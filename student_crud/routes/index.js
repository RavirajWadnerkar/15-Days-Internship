var express = require('express');
var router = express.Router();
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodedemo'
});

connection.connect(function(err){
  if(!err)
  {
    console.log("DB Connected");
  }
  else{
    console.log("DB Connection Failed");
  }
});

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('add-form', { title: 'Express' });
});

//Insert
router.post('/add-process', function(req, res, next) {
  console.log(req.body);

  const mybodydata = {

    name : req.body.txt1,
    physics : req.body.txt2,
    chemistry : req.body.txt3,
    maths : req.body.txt4,
    biology : req.body.txt5,
  }

  connection.query("insert into student_marks set ?",mybodydata,function(err,result){
    if(err) throw err;
    else res.redirect("/add")
  });
});

//Display
router.get('/display', function(req, res, next) {
  
  connection.query("select * from student_marks",function(err,db_rows){

    if(err) throw err;
    //else res.redirect("/display");
    console.log(db_rows);
    res.render('display',{db_rows_array:db_rows});
  });

});

//Delete
router.get('/delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  console.log(deleteid);
  connection.query("delete from student_marks where s_id =?",[deleteid],function(err,db_rows){

    if(err) throw err;
    //else res.redirect("/display");
    console.log(db_rows);
    res.redirect('/display');
  });

});

//Edit Route Get
router.get('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  console.log(editid);
  connection.query("select * from student_marks where s_id =?",[editid],function(err,db_rows){

    if(err) throw err;
    //else res.redirect("/display");
    console.log(db_rows);
    res.render('edit',{db_rows_array:db_rows});
  });

});

//Edit Route Post
router.post('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  
  var sname = req.body.txt1;
  var sphysics = req.body.txt2;
  var schemistry = req.body.txt3;
  var smaths = req.body.txt4;
  var sbiology = req.body.txt5;

  connection.query("update student_marks set name =?, physics =?, chemistry =?, maths =?, biology =? where s_id =?",[sname,sphysics,schemistry,smaths,sbiology,editid],function(err,db_rows){

    if(err) throw err;
    //else res.redirect("/display");
    //console.log(db_rows);
    res.redirect('/display');
  });

});

module.exports = router;
