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
    console.log(req.body);
  }


}

module.exports = new usersControllers();