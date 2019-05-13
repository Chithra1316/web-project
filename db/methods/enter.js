const Promise = require('bluebird');
var models = require('../models');
var Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.json')[env];
var sequelize ={};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

var entermethods = {};

entermethods.enter = (info) => new Promise(
(resolve,reject) =>{

    var months = {};
    months.Monthname = info.monthname;
    months.Duedate = info.duedate;
    console.log(months.Duedate);
    models.monthtab.create(months).then((result)=>{
        console.log(result);
        var vals = {};
        vals.Monthid = result.dataValues.Monthid;
        
        vals.Electricity = info.electricity;
        vals.Water = info.water;
        vals.Mess = info.mess;
        vals.CCF = info.ccf;
        vals.Rent = info.rent;
        vals.Total = parseInt( vals.Electricity ,10) + parseInt( vals.Water ,10) + parseInt( vals.Mess ,10) + parseInt( vals.CCF ,10) + parseInt( vals.Rent ,10);
        models.expense.create(vals).then((results) =>{
            console.log(results);
            resolve(results);

        })
        .catch((err) =>{
            console.log(err);
            reject(err);
        })
    
    }).catch((err)=>{       

        console.log(err);
    })
})

module.exports = entermethods; 