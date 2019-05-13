const express = require('express');
const router = express.Router();
var methods = require('../../methods')

router.get('/', function(req,res){
    res.status(200).send({"success": "true"})
    console.log('entered user')
})

router.post('/enter', function(req,res){
    var info = {};
    info.monthname = req.body.Monthname;
    console.log(req.body.Duedate);
    info.duedate = new Date(req.body.Duedate);
    console.log(info.duedate);
    info.electricity = req.body.Electricity;
    info.water = req.body.Water;
    info.mess = req.body.Mess;
    info.rent = req.body.Rent;
    info.ccf = req.body.CCF;
    methods.entermethods.enter(info).then((result) =>{
        console.log('enter');
        res.render('att');
    })
    .catch((err) =>{
        console.log(err);
    })

})

module.exports =  router;