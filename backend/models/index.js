require('dotenv').config()
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.PROJECT,process.env.NAME,process.env.PASSEWORD, {
  host: process.env.HOST,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};
// Cascade a mettre en part la
db.user = require("./user.js")(sequelize, Sequelize)
db.post = require("./post.js")(sequelize, Sequelize)
db.com = require("./com.js")(sequelize, Sequelize)

db.user.hasMany(db.post) // A beaucoup de post 
db.post.belongsTo(db.user) // A un seul

db.com.belongsTo(db.user )
db.user.hasMany(db.com) 
db.post.hasMany(db.com, {onDelete: 'cascade', hooks:true})

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync; // Permet de modifier automatiquement les model de la base de donnée DANGEREUX une fois le développement fini

module.exports = db;