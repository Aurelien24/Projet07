const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => sequelize.define("com", {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  }
}, {
  sequelize, 
  modelName: 'com' 
  
});