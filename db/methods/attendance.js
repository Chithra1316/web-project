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

var attendancemethods = {};

attendancemethods.getAllAttendance = () => new Promise(
    (resolve, reject) =>{
            sequelize.query("SELECT * FROM attendance;").then((values) =>{
                console.log(values);
                resolve(values);
            })
            .catch((err) =>{
                console.log(err);
                reject(err)
            })
    })

attendancemethods.findTotal = (monthid) => new Promise(
    (resolve, reject) =>{
      var Monthid=monthid;
            sequelize.query("SELECT SUM(Attendance) FROM Attendances WHERE Attendances.Month_id= :monthid", { replacements: { monthid: [Monthid] }, type: sequelize.QueryTypes.SELECT } ).then((metadata) => {
          resolve(metadata[1]);
                console.log(metadata);
            })
            .catch((err) =>{
                console.log(err);
                reject(err)
            })
    })

    attendancemethods.createtable = (info) => {
        console.log('inside adding attendance');
      
        return new Promise((resolve, reject) => {
          models.attendance.create(info).then((model) => {
            resolve(model);
          })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      };





attendancemethods.updateAtt = (info, data) => new Promise((
    resolve,
    reject,
  ) => {
    models.attendance.update(data, {
      where: {
        lhadmno: info.lhadmno,
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
  
  attendancemethods.deleteAllUsers = () => new Promise((
    resolve,
    reject,
  ) => {
    models.attendance.destroy({
      where: {},
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
  
  attendancemethods.deleteAtt = info => new Promise((resolve, reject) => {
   sequelize.query("DELETE FROM Attendances ;",{type: models.sequelize.QueryTypes.DELETE }).then((deleted) => {
      if (deleted === 0) {
        console.log('error tg');
        reject(new Error());
      } else {
        resolve(deleted);
      }
    }).catch((err) => {
      reject(err);
    });
  });
  
   module.exports = attendancemethods; 