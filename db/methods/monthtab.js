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

var monthtabmethods = {};

monthtabmethods.dueDifference = (monthname) => new Promise(
    (resolve, reject) =>{
            sequelize.query("SELECT DATEDIFF(now(),(SELECT Duedate FROM Monthtabs WHERE Monthname=:monthname)) AS D FROM Monthtabs ;",{replacements:{monthname:[monthname]},type: sequelize.QueryTypes.SELECT }).then((values) =>{
                console.log(values[0].D);
                resolve(values);
            })
            .catch((err) =>{
                console.log(err);
                reject(err)
            })
    })

  monthtabmethods.getAllMonthIds = () => new Promise(
   ( resolve, reject) =>{
     sequelize.query('SELECT DISTINCT(Monthname),Monthid FROM Monthtabs;',{replecements:{}, type : sequelize.QueryTypes.SELECT})
     .then((res) =>{
       console.log(res)
       resolve(res)
     })
     .catch((err) =>{
       console.log(err)
       reject(err)
     })
   }
  )
   monthtabmethods.createtable = (info) => {
        console.log('inside adding month details');
      
        return new Promise((resolve, reject) => {
          models.monthtab.create(info).then((model) => {
            resolve(model);
          })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      }

  monthtabmethods.updateUsers = (info, data) => new Promise((
  resolve,
  reject,
) => {
  models.monthtab.update(data, {
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

monthtabmethods.getMonthIdByMonthname = (info) => new Promise ((resolve,reject) =>{

  var monthname = info.monthname;
  sequelize.query("SELECT Monthid FROM Monthtabs WHERE Monthname=:monthname;", {replacements : {monthname:[monthname]}, type : sequelize.QueryTypes.SELECT}).then((result) =>{
    resolve(result);
    console.log(result)
  })
  .catch((err) =>{
    console.log(err)
    reject(err)
  })
})
module.exports = monthtabmethods;

   