const connection = require("../config/db");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const mailer = require("../utils/nodemailer");
require("dotenv").config();

class postsControllers {

  createTrade = (req, res) => {
    const { currency, description, entryPrice, stopLoss, takeProfit, category_id, user_id} = JSON.parse(req.body.crearTrade);

    // let img = "";
    
    // if(req.file){
    //   img = req.file.filename; // me trae la img
    // } 

    let sql = `INSERT INTO post (currency, description, entry_price, stop_loss, take_profit, category_id, user_id, type) VALUES ('${currency}', '${description}', ${entryPrice}, ${stopLoss}, ${takeProfit}, ${category_id}, ${user_id}, 2)`

    if(req.file !== undefined){

      let img = req.file.filename; // me trae la img

      let sql2 = `INSERT INTO post_resource (post_id, resource_type, text, img) VALUES (${post_id}, 1, ${takeProfit}, '${img}')`

      connection.query(sql2, (err2, result2)=>{
        err2 && res.status(500).json(err2)
        if(err2){console.log(err2)}
        })
      }

    connection.query(sql, (err, result)=>{
      if(err){
        res.status(500).json({err})
      }else{
        res.status(200).json(result)
      }
    })
    
    // connection.query(sql, (err, result)=>{
    //   err && res.status(500).json(err)
    //   if(err){console.log(err)}
    //   let post_id = result.insertId; // obtengo del result el post_id

    //   if(req.file !== undefined){

    //     let img = "";
    //     let sql2 = `INSERT INTO post_resource (post_id, resource_type, text) VALUES (${post_id}, 1, '${img}')`

    //     connection.query(sql2, (err2, result2)=>{
    //       err2 && res.status(500).json(err2)
    //       if(err2){console.log(err2)}
    //     })
    //   }
    //   res.status(200);
    // })



    // se puede poner auto-increment en post y post_resource? 
    // para que sirve la tabla de resource-post? 
    // por que me rompe al darle aceptar en crear trade?
  }

  callCategorys = (req, res) =>{
    let sql = `SELECT * FROM category`;

    connection.query(sql, (err, result)=>{
      if(err){
        res.status(500).json(err)
      }else{
        res.status(200).json(result)
      }
    })
  }

}

module.exports = new postsControllers();