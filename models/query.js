const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({

    // Faire lire un fichier de configuration
  host: 'localhost',
  user: 'root',
  database: 'test'
});

module.exports = connection;