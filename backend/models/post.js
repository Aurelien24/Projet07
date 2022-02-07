const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => sequelize.define("post", {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  sequelize, 
  modelName: 'post' 
  
});