'use strict';


module.exports = (sequelize, DataTypes) => {
  var Expense = sequelize.define('Expense', {
    id:{
        type:DataTypes.INTEGER(),
        primaryKey:true,
        autoIncrement:true,
    },
    Monthid: {
      type: DataTypes.INTEGER(),
      unique:"compositeIndex",
    },
    Electricity: {
      type : DataTypes.INTEGER(),
    },
    Water: {
        type : DataTypes.INTEGER(),
    },
    Mess: {
        type : DataTypes.INTEGER(),
    },  
    Rent: {
        type : DataTypes.INTEGER(),
    },
    CCF: {
        type : DataTypes.INTEGER(),
    },
    Total: {
        type : DataTypes.INTEGER(),
    },
    Oneday: {
        type : DataTypes.FLOAT(),
    },
    
  
  });
    Expense.associate = function (models) {
    models.Expense.belongsTo(models.Monthtab, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'Month_id',
        allowNull: false
        // allowNull: false -- already defined
      },
    });
  };

  return Expense;
}