const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    res.status(200).json({
        message : "Success"
    });
})
router.use(('/signin'),require('./signin'));
router.use(('/signup'),require('./signup'));

module.exports = router;