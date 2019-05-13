var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var users = require('../../../models').user;
var bodyparser = require('body-parser');
var sequelize=require('sequelize');

router.get('/', function(req,res){
    res.status(200).json({
        message : "Success"
    });
})
router.get('/user', function(req,res){
    res.render('index');
})


router.post('/',function(req,res){
  if(!req.body.username || !req.body.password){
    res.send('Enter a username or password to register ');
  }
  else{

    var user= new users({
      username:req.body.username,
      password:req.body.password,
      course:req.body.course,
      department : req.body.department,
      semester:req.body.semester,
      category:req.body.category,

    });
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
      console.log(hash);
      user.password = hash;
      user.save().then(() => {
      
        res.render('reg');
      
      });
    });
        
  


  }
});
module.exports = router;