const mysql = require('mysql');
require('dotenv').config();

// Creo la conexion con la base de datos
const conexion = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

conexion.getConnection((error) => {
    if(error) throw error;
    console.log('Conexion con la base de datos correcta!')
})

// Exporto para que pueda ser llamada la constante conexion desde otros archivos
module.exports = conexion;