const express = require('express');
const router = express.Router();
var methods = require('../../methods')

router.get('/', function(req,res){
    res.status(200).send({"success": "true"})
})
router.get('/enter', function(req,res){
 
    res.render('attendance');
})
router.post('/enter', function(req,res) {
    console.log('ok')
var att = {}
att.Month_id = req.body.monthid;
att.Student_id = req.body.studentid;
att.Attendance = req.body.attendance;
console.log(att);

methods.attendancemethods.createtable(att)
.then(() =>{
    console.log('inside attendance methods');
    res.render('attendance')
})
.catch((err) =>{
    console.log(err);
})

})

router.delete('/delete', (req, res) => {
    const info = {};
    info.lhadmno = req.body.lhadmno;
    methods.attendancemethods.deleteAtt(info)
      .then((model) => {
        res.status(200).json({
          status: 'Attendance Deleted',
          state: model,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 'Not able to delete.The row may not exist.',
          state: err,
        });
      });
  });
  
//router.use(('/authenticate'),require('./authentication'));
//router.use(('/admin'),require('./admin'));

module.exports = router;