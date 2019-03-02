var mysql = require('mysql');
const { promisify } = require('util');

var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'heboshka',
  password: 'class17',
  database: 'class17_db'
});




dbConnection.queryPromise = promisify(dbConnection.query);
module.exports = dbConnection;