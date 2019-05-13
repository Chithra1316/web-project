const Promise = require('bluebird');
var models = require('../models');
var Sequelize = require('sequelize');
var methods = require('../methods');
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.json')[env];
var sequelize ={};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
var methods = require('../methods');

var expensemethods = {};

expensemethods.findTotal = (monthid) => new Promise(
    (resolve, reject) =>{
      var Monthid=monthid;
            sequelize.query("UPDATE Expenses SET Total=Electricity+Mess+Water+Rent+CCF WHERE Monthid= :monthid", { replacements: { monthid: [Monthid] }, type: sequelize.QueryTypes.UPDATE } ).then((metadata) => {
          resolve(metadata[1]);
            console.log(metadata[1]);
            })
            .catch((err) =>{
                console.log(err);
                reject(err)
            })
    })

expensemethods.findOneDay = (monthid) => new Promise(
    (resolve, reject) =>
    {
      var Monthid=monthid;
      sequelize.query('SELECT Total FROM Expenses WHERE Monthid =:monthid;',{replacements:{monthid:[Monthid]},type: sequelize.QueryTypes.SELECT }).then((Total) =>{
        console.log(Total[0].Total)
        Total=Total[0].Total;
              sequelize.query('SELECT SUM(Attendance) AS S FROM Attendances WHERE Month_id =:monthid;',{replacements:{monthid:[Monthid]},type: sequelize.QueryTypes.SELECT }).then((Totalattendance) =>{
          console.log(Totalattendance)
          Totalattendance = Totalattendance[0].S;
          sequelize.query("UPDATE Expenses SET Oneday= Total/ :Totalattendance WHERE Expenses.Monthid= :monthid", { replacements: { monthid: [Monthid] ,Totalattendance:[Totalattendance]}, type: sequelize.QueryTypes.UPDATE } ).then((metadata) => {

        sequelize.query("SELECT SUM(Attendance) AS S FROM Attendances WHERE Attendances.Month_id= :monthid", { replacements: { monthid: [Monthid] }, type: sequelize.QueryTypes.SELECT } ).then((Totalattendance) =>{
          console.log(Totalattendance)
            Totalattendance = Totalattendance[0].S

          sequelize.query("UPDATE Expenses SET Oneday= :Total/ :Totalattendance WHERE Expenses.Monthid= :monthid", { replacements: { Total:[Total], monthid: [Monthid] ,Totalattendance:[Totalattendance]}, type: sequelize.QueryTypes.UPDATE } ).then((metadata) => {
            resolve(metadata[1]);
            console.log(metadata);
          })
          .catch((err) =>{
            console.log(err);
            reject(err)
        });
      })
      .catch((err) =>{
        console.log(err)
      })

      })

      .catch((err) =>{
        console.log(err)
      })
       
    })
  .catch((err) =>{
    console.log(err)
  })
})
  .catch((err) =>{
    console.log(err);
  })
});

   expensemethods.createtable = (info) => {
        console.log('inside adding month details');
      
        return new Promise((resolve, reject) => {
          models.expense.create(info).then((model) => {
            resolve(model);
          })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      };

  expensemethods.updateUsers = (info, data) => new Promise((
  resolve,
  reject,
) => {
  models.expense.update(data, {
    where: {
      Monthid: info.Monthid,
    },
  })
    .then((updated) => {
      if (updated > 0) {
        resolve(updated);
      } else {
        reject(new Error());
        // throw ('err')
      }
    }).catch((error) => {
      reject(error);
    });
});

   module.exports = expensemethods; 