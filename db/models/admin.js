'use strict';
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define('Admin', {
    username: DataTypes.STRING,
    password : DataTypes.STRING,
  });


  return Admin;
};
