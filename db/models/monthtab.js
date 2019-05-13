'use strict';


module.exports = (sequelize, DataTypes) => {
  var Monthtab = sequelize.define('Monthtab', {
    Monthid: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    Monthname: {
      type : DataTypes.STRING(20),
    },
    Duedate: {
      type : DataTypes.DATE(),
    },
  });

  return Monthtab;
}
