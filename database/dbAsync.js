const mysql = require('mysql2/promise');

const dbAsync = mysql.createPool({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'password',
    database: 'dbventas'
});

module.exports = dbAsync;
