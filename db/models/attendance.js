'use strict';

const bcrypt =  require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  var Attendance = sequelize.define('Attendance', {
    id:{
      type:DataTypes.INTEGER(),
      primaryKey:true,
      autoIncrement:true,
    },
    Month_id: {
      type: DataTypes.INTEGER(),
      unique: "compositeIndex",
    },
    lhadmno : {
      type : DataTypes.STRING(20),
    },
    Attendance: {
      type : DataTypes.INTEGER(),
    },
 
  
  });
  Attendance.associate = function (models) {
    models.Attendance.belongsTo(models.Monthtab, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'Month_id',
        allowNull: false
        // allowNull: false -- already defined
      },
    });
  };
  Attendance.associate = function (models) {
    models.Attendance.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'Student_id',
        allowNull: false
        // allowNull: false -- already defined
      },
    });
  };

  return Attendance;
}