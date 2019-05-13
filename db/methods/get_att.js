const Promise = require('bluebird');

const models = require('../models');

const getAttendance = function (username) {
  return new Promise(((resolve, reject) => {
    // change raw query to sequelize functions when they add support for json
    // is this the best query?
    // eslint-disable-next-line max-len
    models.sequelize.query('SELECT Attendance FROM Attendances WHERE Student_id = (SELECT id FROM Users WHERE username = :username);',{replacements :{username: [username]}},
    // eslint-disable-next-line max-len
    // models.sequelize.query('SELECT JSON_CONTAINS((SELECT data FROM people_informations WHERE people_id = 1 AND slug_id = 1), \'["' + email + '"]\') as check_flag;',
      { type: models.sequelize.QueryTypes.SELECT })
      .then((result) => {
          resolve(result[0][0].Attendance);
          console.log(result[0][0].Attendance);
      }).catch((err) => {
       console.log(err);
        reject(err);
      });
   
  }));
};

module.exports = getAttendance;
