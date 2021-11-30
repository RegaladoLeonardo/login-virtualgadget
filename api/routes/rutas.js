const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysqlConection = require('../conection/conection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const secretKey = '9070N_C0_see?#';


function generateToken(user) {

  var u = {
   username: user.username,
   id: user.id
  }

  return token = jwt.sign(u, secretKey, {
     expiresIn: 60 * 60 * 6 // 12 horas?
      // 60 * 60 * 24 expires in 24 hours
  })
}


router.get('/',(req,res)=>{

    mysqlConection.query('select * from usuarios',(err,rows, fiesds)=>{
        if(err){
            console.log(err);
        }else{
            
            res.status(200).json(rows);
        }
    } )
});

router.get('/verifyToken',(req,res)=>{

    console.log("ruta de verificacion");
    try {
        
        const resultadoT = jwt.decode( req.headers.token, secretKey);
        //console.log(JSON.parse(JSON.stringify(resultadoT)));
    
        console.log(resultadoT);
        res.status(200).json(resultadoT);
    } catch (Err) {
        console.log(Err);
    }

});




router.post('/signup',(req, res)=>{
    let { username, password, name, apellidop, apellidom, fechaNac, valor } = req.body;
    password = bcrypt.hashSync( password , saltRounds);
    const Usu = req.body;
    mysqlConection.query(`insert into usuarios(username, password, apm, app, fechadenacimiento, valor, nombre) values( '${username}'    ,'${password}','${apellidom}','${apellidop}','${fechaNac}',${valor},'${name}' )`,
    (err,rows,fields)=>{

        if(!err){

            let tokenReady = generateToken(Usu);
            //console.log(tokenReady);
            const respuesta = { tokenReady, Usu }
            console.log("Se hizo el registro exitosamente");
            res.status(200).json(respuesta);
        }else{
            console.log(err);
        }

    })
}) 
/*
bcrypt . compare ( myPlaintextPassword ,  hash ,  function ( error ,  resultado )  { 
    // result == true 
} ) ; 
*/

router.post('/signin',(req, res)=>{
    const { username, password } = req.body;
    mysqlConection.query(`SELECT * FROM usuarios WHERE username='${username}' `,//and password='${password}
    (err,rows,fields)=>{

        if(!err){
            let message  ='';
            console.log('-----------------------------');
            console.log(JSON.parse(JSON.stringify(rows[0])));
            console.log('-----------------------------');
            let resultadoL = {message, rows}
        
            let alumno = JSON.parse(JSON.stringify(rows[0]));

            //let alumno = Object.keys(rows)
            //console.log(Object.values(rows));

            console.log('Estoy comparando para=> '+password+' y ' + alumno.password  );
            bcrypt.compare(password , alumno.password , function( error ,  resultado ){
            //console.log(JSON.parse(JSON.stringify(resultadoT)));
                
                if(resultado){
                    let tokenReadyL = generateToken(rows);
                    console.log('Este es el token de login: ' + tokenReadyL);
                    message  ='Se encontro al usuario exitosamente!';
                    console.log('existe el usuario');
                    const resultadoL = {message, rows, tokenReadyL}
                    res.status(200).json(resultadoL);

                }else{

                    message  ='No existe el usuario';
                    console.log('No existe el usuario');
                    
                    res.status(404).json(resultadoL);
                    console.log('EL ERROR: '+ err) 
                }
            });
            /*
            if(rows.length==0){
                
                message  ='No existe el usuario';
                console.log('No existe el usuario');
                
                res.status(404).json(resultadoL);
            }else{
                let tokenReadyL = generateToken(rows);
                console.log('Este es el token de login: ' + tokenReadyL);
                message  ='Se encontro al usuario exitosamente!';
                console.log('existe el usuario');
                const resultadoL = {message, rows, tokenReadyL}
                res.status(200).json(resultadoL);
                */
            }else{
                console.log(err);
                }
    })
}) 




module.exports = router;