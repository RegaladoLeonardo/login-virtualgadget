const mysql = require('mysql');

const mysqlConection = mysql.createConnection({
    host:'localhost', 
    user: 'root', 
    password:'LevAISQL90_8',
    database:'registro' ,
    port: ''
})


mysqlConection.connect(err=>{

    if(err){
        console.log('Upss! Algo sucedio mal en la base de datos');
    }else{
        console.log('Conexion a la BD exitosa!');
    }
})

module.exports = mysqlConection;