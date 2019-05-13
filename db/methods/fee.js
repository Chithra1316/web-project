const Promise = require('bluebird');
var models = require('../models');
var Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.json')[env];
var sequelize ={};
const methods = require('../methods');

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

var feemethods = {};

feemethods.getAllFee = () => new Promise(
  (resolve, reject) =>{
          sequelize.query("SELECT * FROM Fees WHERE paymentstatus=0;",{type: sequelize.QueryTypes.SELECT}).then((values) =>{
              console.log(values);
              resolve(values);
          })
          .catch((err) =>{
              console.log(err);
              reject(err)
          })
  })

  feemethods.setPaid = (info) => new Promise(
    (resolve, reject) =>{
      sequelize.query("UPDATE Fees SET paymentstatus = 1 where Month_id=:monthid AND lhadmno = :lhadmno;", {replacements:{monthid:[info.Month_id], lhadmno:[info.lhadmno]},type: sequelize.QueryTypes.UPDATE}).then((result)=>{
        resolve(result);
      })
      .catch((err) =>{
        console.log(err);

      })
    }
  )
  feemethods.getFeeByUsername = (username) => new Promise((resolve,reject) =>{
    sequelize.query("SELECT id FROM Users WHERE username= :username",{replacements:{username:[username]}, type: sequelize.query.SELECT}).then((id) =>{
      console.log(id[0])
      var ids= id[0];
      var newid = ids[0].id
      console.log(newid)
      sequelize.query("SELECT * FROM Fees WHERE Student_id = :newid",{replacements:{newid :[newid]}, type: sequelize.QueryTypes.SELECT}).then((fee) =>{
        console.log(fee);
        resolve(fee)
      })
      .catch((err) =>{
        console.log(err)
      })
    })
    .catch((err) =>{
      console.log(err)
    })
  })
  feemethods.calcFee = (monthid,studentid) => new Promise(
    (resolve, reject) =>{
            sequelize.query("SELECT  Attendance FROM Attendances WHERE Month_id=:monthid AND Student_id=:studentid;",{replacements:{monthid : [monthid],studentid:[studentid]},type: sequelize.QueryTypes.SELECT}).then((atten) =>{
                console.log(atten);
                //resolve(atten);
                atten = atten[0].Attendance;

                sequelize.query("SELECT  Oneday FROM Expenses WHERE Monthid=:monthid;",{replacements:{monthid:[monthid]},type: sequelize.QueryTypes.SELECT}).then((oneda) =>{
                  console.log(oneda);
                  oneda = oneda[0].Oneday;
                  //resolve(oneda);
                  sequelize.query("UPDATE  Fees SET fee=:oneda*:atten+fine WHERE Month_id=:monthid AND Student_id=:studentid;",{replacements:{oneda:[oneda],atten:[atten],monthid:[monthid],studentid:[studentid]},type: sequelize.QueryTypes.UPDATE}).then((values) =>{
                    console.log(values);
                    resolve(values);
                })
                .catch((err) =>{
                    console.log(err);
                    reject(err)
                })
        
              })
              .catch((err) =>{
                  console.log(err);
                //  reject(err)
              })
            })
            .catch((err) =>{
                console.log(err);
               // reject(err)
            })
           
          
    })


feemethods.findFine = (monthid,lhadmno) => new Promise(
    (resolve, reject) =>{
      sequelize.query('SELECT monthname FROM Monthtabs where Monthid=:monthid;', {replacements:{monthid : [monthid]}}).then((month) =>{
        var monthname = month[0][0].monthname;
        console.log(monthname)

        sequelize.query("SELECT DATEDIFF(now(),(SELECT Duedate FROM Monthtabs WHERE Monthname=:monthname)) AS D FROM Monthtabs ;",{replacements:{monthname:[monthname]},type: sequelize.QueryTypes.SELECT }).then((values) =>{
          console.log(values[0].D);
          var val = values[0].D+40;
          if(val<=0)
          {resolve( values)}
          else{
        sequelize.query("UPDATE Fees SET fine = :values WHERE lhadmno= :lhadmno AND paymentstatus=0;",{replacements:{values:[val],lhadmno : [lhadmno] }, type: sequelize.QueryTypes.UPDATE}).then((values) =>{
          console.log(values);
          resolve(values);
      })
      .catch((err) =>{
          console.log(err);
          reject(err)
        })
      }
      })
    
      .catch((err) =>{
      console.log(err)
      })
  
      })
      .catch((err) =>{
        console.log(err);
      })
     
    })

   feemethods.createtable = (info) => {
        console.log('inside adding month details');
      console.log(info)
        return new Promise((resolve, reject) => {
          models.fee.create(info).then((model) => {
            resolve(model);
          })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      }

  feemethods.updatefees = (info, data) => new Promise((
  resolve,
  reject,
) => {

  sequelize.query('UPDATE Fees SET Fees = :data WHERE Monthid = :monthid',{ replacements:{monthid : [info.Monthid], data:[data]}, type: sequelize.QueryTypes.UPDATE })
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
 feemethods.getfee = (monthid,studentid) => new Promise(
    (resolve, reject) =>{
            sequelize.query("SELECT fee FROM Fees WHERE Month_id=:monthid AND Student_id=:studentid", { replacements:{monthid : [monthid], studentid:[studentid]}, type: sequelize.QueryTypes.UPDATE }).then((values) =>{
                console.log(values);
                resolve(values);
            })
            .catch((err) =>{
                console.log(err);
                reject(err)
            });
    });


   module.exports = feemethods; 