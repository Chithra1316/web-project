const express = require('express');
const router = express.Router();
var methods = require('../methods');

router.get('/', function(req,res){
    res.status(200).json({
        message : "Success"
    });
})
router.get('/user', function(req,res){
    methods.usermethods.getCount().then((result) =>{
        console.log(result);
    
        var p ={};
        p.val=500-result;
        res.render('home',{p});
    })

})
router.get('/reg', function(req,res){
    res.render('signup');
})
router.get('/sig', function(req,res){
    res.render('signin');
})
router.get('/ad', function(req,res)
{
    res.render('admin');
})
router.use(('/authenticate'),require('./authentication'));
router.use(('/admin'),require('./admin'));

module.exports = router;