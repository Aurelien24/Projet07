const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // Model attributes are defined here
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Besoin ? Je crois pas...
   // Other model options go here
  // sequelize, // We need to pass the connection instance
  // modelName: 'User' // We need to choose the model name
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true