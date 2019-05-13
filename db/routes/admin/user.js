const express = require('express');
const router = express.Router();
var methods = require('../../methods')

router.get('/', function(req,res){
    res.status(200).send({"success": "true"})
    console.log('entered user')
})

router.post('/getall', function(req,res) {
  
    methods.usermethods.getAllUser().then((users) =>{
        console.log(users)
    })
})
router.get('/fun',function(req,res) {



})


router.delete('/delete', (req, res) => {
    const info = {};
    info.lhadmno = req.body.lhadmno;
    methods.usermethods.deleteUsers(info)
      .then((model) => {
        res.status(200).json({
          status: 'User Deleted',
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