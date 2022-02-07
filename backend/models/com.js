const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => sequelize.define("com", {
  text: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize, 
  modelName: 'com' 
  
});