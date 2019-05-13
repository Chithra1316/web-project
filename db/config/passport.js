var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var users=require('../models').user;
var config=require('./config.js');


module.exports=  function(passport){
	var opts={};
	//opts.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken("JWT ");
	opts.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken("JWT ");

	opts.secretOrKey=config;
	passport.use(new JwtStrategy(opts,function(jwt_payload,done){
		users.findOne({id:jwt_payload.id},function(err,users){
			if(err)
			{
				console.log(err);
				return done(err,false);
			}
			if(users)
			{
				return done(null,users);
			}
			else{
				done(null,false);
			}

		});
	}));

}