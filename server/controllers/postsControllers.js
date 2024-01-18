const connection = require("../config/db");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const mailer = require("../utils/nodemailer");
require("dotenv").config();

class postsControllers {

  createTrade = (req, res) => {
    console.log(req.body);
    const { currency, description, entryPrice, stopLoss, takeProfit} = req.body;
    
    // probando en el workbench: 
    //INSERT INTO post (post_id, user_id, currency, description, entry_price, stop_loss, take_profit, category_id, type) VALUES (1, 1, 'a', 'b', '1', '2', '1', 1, 2);
    // hay que hacer: 
    //  - user_id -> hay que obtenerlo
    //  - post_id -> debería crearse solo en MySQL 
    //  - category?id -> debe depender de lo que se elija en el select 
    //  - type -> como es trade debería ser en este caso siempre 2

    // esta llamada está relacionada con las tablas: user, post y category
    //  let sql = `INSERT INTO post (currency, description, entry_price, stop_loss, take_profit, category) VALUES ('${currency}', '${description}', ${entryPrice}, ${stopLoss}, ${takeProfit})`;



    //  connection.query(sql, (error, result) => {
    //   if (error) {
    //     res.status(500).json({ error });
    //   } else {
    //     res.status(200).json(result);
    //   }
    // });
  }
}

module.exports = new postsControllers();