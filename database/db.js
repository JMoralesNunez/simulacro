const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'Jmn94089#',
    database: 'dbventas'
})

db.connect((err)=>{
    if (err) {
        throw err
    }
    console.log('Conectado a base de datos');
})

module.exports = db;