const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Post = sequelize.define('Post', {
  // Model attributes are defined here
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
},);

// `sequelize.define` also returns the model
console.log(Post === sequelize.models.Post); // true