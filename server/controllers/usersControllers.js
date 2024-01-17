const connection = require("../config/db"); 
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

class usersControllers {
  // ---------------------------------------------------------------
  // 1.-crear un usuario
  createUser = (req, res) => {
    // const {name, email, password} = req.body;
    // // validación

    // // encriptar el password 
    // let saltRounds = 8; // 8 saltos
    // bcrypt.genSalt(saltRounds, function(err, saltRounds) {
    //   bcrypt.hash(password, saltRounds, function(err, hash) {
    //     if(err) {
    //       console.log(err)
    //     } else{
    //       let sql = `INSERT INTO user (name, email, password) VALUES ( '${name}', 
    //       '${email}', '${hash}')` 

    //       connection.query(sql, (error, result)=> {
    //         error
    //             ? res.status(500).json({error}) 
    //             : res.status(200).json(result)
    //       })
    //     }
    //   });
    // });
  }


  // ---------------------------------------------------------------
  // 2.-login
  loginUser = (req, res) => { 
    const {email,password} = req.body;
    let sql = `SELECT * FROM user WHERE email= "${email}"`
    connection.query(sql,(error,result)=>{
      if(error) return res.status(500).json(error)
      console.log(result);
    if(!result || result.length === 0 || result[0].is_deleted == 1){
      res.status(401).json("Usuario no autorizado")
    }else{
      const user = result[0];
      const hash = user.password;

      bcrypt.compare(password,hash, (error,response)=>{
        if(error) return res.status(500).json(error)

        if(response == true){
          const token = jwt.sign(
            {user:{
              user: user.user_id,
              type:user.type
            }
          },
          process.env.SECRET,
          {expiresIn:"1d"})//consultar cuanto tiempo queremos que se guarde la contraseña

          res.status(200).json({token,user})
        }else{
          res.status(401).json("Email o contraseña incorrecta")
        }
        console.log("responseeeeeeeeeee",response);//con esto probamos si la contraseña coincide(true/false)
      })
    }
    })
  }


}

module.exports = new usersControllers();