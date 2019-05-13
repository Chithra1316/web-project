const express = require('express');
const router = express.Router();
var methods = require('../../methods');
var models = require('../../models');
var ad=0;
router.get('/', function(req,res)
{
    res.status(200).json({"message" : "success"});
    console.log('entered index')

})
router.post('/', function(req,res){
  var admin =
    {
     username : "theertha",
     password : "amala"
    }
    if(admin.username=req.body.username&&admin.password==req.body.password)
    {
        methods.usermethods.getAllUser()
        .then((user) => {
        var ret;
        console.log('entered');
        console.log(user);
            ret = user;
        res.render('table',{ret});
        })

    }
})
router.post('/verify/', function(req,res)
{
    console.log("inside verify");
    console.log(req.body.username);
    methods.usermethods.findByUsername(req.body.username).then((users) =>{
        console.log("users:",users)
            
            var mesg="16lh0";
            methods.usermethods.getVerifiedCount().then((result) =>{
                methods.usermethods.setAdmno(result,req.body.username).then((val) =>{
                console.log(val);
                methods.usermethods.getAllUser()
                .then((user) => {
                var ret;
                console.log('entered');
                console.log(user);
                    ret = user;
                res.render('table',{ret});
                }).catch((err) =>{
                    console.log(err);
                })
            })
            .catch((err) =>{
                console.log(err);
            })
           

        }).catch((err) =>{
            console.log(err);
        })
    
        
    })
    .catch((err) => {
        console.log("error : ", err);

    })

})

router.get('/verified/', (req,res) => {

res.render('details');
console.log("Inside verified");
})
router.use(('/monthtab'),require('./monthtab'));
router.use(('/attendance'),require('./attendance'));
router.use(('/user'),require('./user'));
router.use(('/fee'),require('./fee'));
router.use(('/expense'),require('./expense'));
router.use(('/main'),require('./main'));
router.use(('/st'), require('./st'));
module.exports = router;
