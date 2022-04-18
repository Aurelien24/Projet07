const { DataTypes, Model } = require('sequelize');

// ... peut évité de le recopier txt:req.body.txt
module.exports = (sequelize, Sequelize) => sequelize.define("post", {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: true
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
  modelName: 'post' 
});