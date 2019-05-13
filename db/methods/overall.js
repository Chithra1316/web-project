const Promise = require('bluebird');
var models = require('../models');
var Sequelize = require('sequelize');
const methods = require('../methods')
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.json')[env];
var sequelize ={};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const methods = require('../methods');
var abc = {}
abs.findfee = (monthid,studentid) => new Promise(
    (resolve, reject) =>{
      var Monthid=monthid;
      var Studentid=studentid;
            sequelize.query("SELECT Expenses.Oneday*Attendances.Attendance FROM Expenses WHERE Expenses.Monthid= :monthid AND Attendances.Month_id= :monthid AND Attendances.Student_id= :studentid",{ replacements: { monthid: [Monthid] ,studentid: [Studentid]}, type: sequelize.QueryTypes.SELECT } ).then((metadata) => {
          resolve(metadata[1]);
            console.log(metadata);
            })
            .catch((err) =>{
                console.log(err);
                reject(err)
            });
    });


module.exports = abc;