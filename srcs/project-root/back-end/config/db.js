const mysql = require('mysql2')
const dotenv = require('dotenv').config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'MercadoMistico'
})

connection.connect(function(err){
    if (err){
        throw err;
    } else {
        console.log('MySql conectado!')
    }
})

module.exports = connection