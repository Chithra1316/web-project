const express = require('express');
const router = express.Router();
var methods = require('../../methods')

router.get('/', function(req,res){
    console.log(req.body.name);
})

var i=0;
router.get('/back', function(req,res){

})
router.post('/attendance/', function(req,res){

    var user = {}
   

        console.log(req.body);
        console.log('inside attendance');
        console.log(req.body.month)
        var info = {}
        info.monthname = req.body.month;
       methods.monthtabmethods.getMonthIdByMonthname(info)
        .then((results) =>{
            console.log(results)
             await methods.usermethods.getAllVerifiedUser().then((result)=>{
                console.log(result)
                for( var i=0;i< result.length;i++)
                {
                user.lhadmno = result[i].lhadmno;
                user.Attendance = parseInt(req.body.vals[i]);
                user.Month_id = results[0].Monthid;
                methods.attendancemethods.createtable(user).then((somethings) =>{
                    console.log('Inside then')
                    console.log(somethings);
                 
                 
             
                })
                .catch((err) =>{
                    console.log(err)
                })
                }
    
    
            })
            .catch((err) =>{
                console.log(err)
            })

        })
        .catch((err) =>{
            console.log(err)
        })
    

    
})
router.post('/calcFee', (req,res) =>{
    console.log(data)
})
router.post('/', (req,res) => {
    console.log(req.body);

    console.log("INSIDE POST")
    var info = {};
    var students = {};
    info.monthname =  req.body.Monthname;
    methods.monthtabmethods.getMonthIdByMonthname(info).then((result) =>{
        console .log(result)
        info.Monthid = result[0].Monthid;
            methods.usermethods.getAllVerifiedUser().then((verified) =>{
                console.log(verified);
                students.monthname = info.monthname;
                students.verified = verified;
                res.render('attn', {user:students});

            })
            .catch((error) =>{
                console.log(error);
            })
     
    })
    .catch((err) =>{
        console.log(err);
    })
})


module.exports =  router;