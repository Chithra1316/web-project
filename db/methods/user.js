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

var usermethods = {};

usermethods.getAllUser = () => {return new Promise((resolve,
    reject) => {
        models.user.findAll()
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
usermethods.getCount = () =>{
  return new Promise((resolve,reject) =>{
    sequelize.query("SELECT COUNT(id) AS C from Users;",{type:sequelize.QueryTypes.SELECT})
    .then((result) =>{
      console.log(result)
      resolve(result[0].C);
    })
    .catch((err) =>{
      console.log(err);
      reject(err);
    })
  })
}
usermethods.getAllVerifiedUser = () =>{
  return new Promise((resolve,reject) =>{
    sequelize.query("SELECT lhadmno,username from Users WHERE verified=1;",{type:sequelize.QueryTypes.SELECT})
    .then((result) =>{
      resolve(result);
    })
    .catch((err) =>{
      console.log(err);
      reject(err);
    })
  })
}
  usermethods.getUserByUsername = (user) => { return new Promise((resolve,
    reject) => {
      sequelize.query('SELECT * FROM Users WHERE Users.username = :username ',
      { replacements: { username: [user] }, type: sequelize.QueryTypes.SELECT }
    ).then(user => {
      console.log(user);
      resolve(user);
    })
    .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

usermethods.findByUsername = (username) => { return new Promise((resolve,
  reject) => {
    var Username = username;
      sequelize.query("UPDATE Users SET verified = true WHERE Users.username = :username", { replacements: { username: [Username] }, type: sequelize.QueryTypes.UPDATE } ).then((metadata) => {
          resolve(metadata[1]);
    }).catch((err) =>{
      console.log("error inside usermethods :", err);
      reject(err);
    })
  
  })
}
  
usermethods.getVerifiedCount = () => { return new Promise((resolve,
reject) =>{
  sequelize.query("SELECT COUNT(id) AS C FROM Users WHERE verified = 1;", { replacements: { }, type: sequelize.QueryTypes.SELECT }).then((result) =>{
    resolve(result[0].C)

  })
  .catch((err) =>{
    console.log(err);
  })
})

}
  usermethods.setAdmno = (mesg,username) => {return new Promise((resolve,
  reject) => {
    var name = username
    console.log(mesg)
    if(mesg<10)
    { var val = "16LH0"+mesg;
      sequelize.query("UPDATE Users SET lhadmno = :val WHERE Users.username = :username", { replacements: { username: [name], val:[val] }, type: sequelize.QueryTypes.UPDATE } ).then((metadata) => {
          resolve(metadata[1]);
    
        })
        .catch((err) =>{
          console.log(err);
          reject(err);
  
        })
      }
      else
      {
        var val = "16LH"+mesg;
      sequelize.query("UPDATE Users SET lhadmno = :val WHERE Users.username = :username", { replacements: { username: [name], val:[val] }, type: sequelize.QueryTypes.UPDATE } ).then((metadata) => {
          resolve(metadata[1]);
    
        })
        .catch((err) =>{
          console.log(err);
          reject(err);
  
        })
      }
      })  
  }

  usermethods.updateUsers = (info, data) => new Promise((
  resolve,
  reject,
) => {
  models.user.update(data, {
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

usermethods.deleteAllUsers = () => new Promise((
  resolve,
  reject,
) => {
  models.user.destroy({
    where: {},
  })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

usermethods.deleteUsers = info => new Promise((resolve, reject) => {
  models.user.destroy({
    where: {
      ladmno : info.lhadmno
    },
  }).then((deleted) => {
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

module.exports = usermethods;