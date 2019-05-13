const express = require('express');
const router = express.Router();
var methods = require('../../methods')

router.get('/', function(req,res){
    res.status(200).send({"success": "true"})
    console.log('entered monthtab')
})
router.get('/enter', function(req,res){
 
    res.render('monthtab');
})
router.post('/enter', function(req,res) {
    console.log('ok')
var mon = {}
mon.Monthname = req.body.Monthname;
mon.Duedate = req.body.Duedate;
console.log(mon);

methods.monthtabmethods.createtable(mon)
.then(() =>{
    console.log('inside monthtab methods');
    res.render('monthtab')
})
.catch((err) =>{
    console.log(err);
})

})

//router.use(('/authenticate'),require('./authentication'));
//router.use(('/admin'),require('./admin'));

module.exports = router;