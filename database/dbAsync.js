const mysql = require('mysql2/promise');

const dbAsync = mysql.createPool({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'Jmn94089#',
    database: 'dbventas'
});

module.exports = dbAsync;
