const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '168.119.183.3',
    port: 3307,
    user: 'root',
    password: 'g0tIFJEQsKHm5$34Pxu1',
    database: 'jhonatan'
})

db.connect((err)=>{
    if (err) {
        throw err
    }
    console.log('Conectado a base de datos');
})

module.exports = db;