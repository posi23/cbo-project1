const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
      // host: process.env.DB_HOST,
      // port: process.env.DB_PORT,
      // user: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      // multipleStatements: true

      host: "msqldb",
      // port: "3306",
      user: "root",
      password: "password",
      database: "assignment",
      multipleStatements: true
});

module.exports = mysqlConnection;