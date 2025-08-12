const mysql = require('mysql2/promise');

const dbAsync = mysql.createPool({
    host: '168.119.183.3',
    port: 3307,
    user: 'root',
    password: 'g0tIFJEQsKHm5$34Pxu1',
    database: 'jhonatan'
});

module.exports = dbAsync;
