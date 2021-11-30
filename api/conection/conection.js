const mysql = require('mysql');

const mysqlConection = mysql.createConnection({
    host:'localhost', 
    user: 'root', 
    password:'LevAISQL90_8',
    database:'registro' ,
    port: ''
})


/*
const mysqlConection = mysql.createConnection({
    host:'us-cdbr-east-04.cleardb.com', 
    user: 'b3536c0cd563b4', 
    password:'a038bf91',
    database:'heroku_a5616534128b5ae' ,
    port: ''
})
*/
mysqlConection.connect(err=>{

    if(err){
        console.log('Upss! Algo sucedio mal en la base de datos');
    }else{
        console.log('Conexion a la BD exitosa!');
    }
})

module.exports = mysqlConection;