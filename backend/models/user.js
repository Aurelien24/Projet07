const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
}, {
  sequelize, 
  modelName: 'user' 
  
});

/*
const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("User", {
    id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true
    },
    mail: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    firstname: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    status: Sequelize.STRING(100)
})
*/