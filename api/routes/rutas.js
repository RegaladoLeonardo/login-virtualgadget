const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysqlConection = require('../conection/conection')

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
    const { username, password, name, apellidop, apellidom, fechaNac, valor } = req.body;
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

router.post('/signin',(req, res)=>{
    const { username, password } = req.body;
    mysqlConection.query(`SELECT * FROM usuarios WHERE username='${username}' and password='${password}'`,
    (err,rows,fields)=>{

        if(!err){
            console.log(rows);
            if(rows.length==0){
                console.log('No existe el usuario');
            }else{
                console.log('exisyte el usuario');
            }
            
            res.json(rows)
        }else{
            console.log(err);
        }

    })
}) 




module.exports = router;