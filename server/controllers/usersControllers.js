const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/nodemailer");
require("dotenv").config();

class usersControllers {
  // ---------------------------------------------------------------
  // 1.-crear un usuario
  createUser = (req, res) => {
    const { nickname, name, lastname, email, password } = req.body;
    // falta validación del back

    let saltRounds = 8; // 8 saltos
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          let sql = `INSERT INTO user (nickname, name, lastname, email, password) VALUES ('${nickname}','${name}', '${lastname}','${email}', '${hash}')`;
          connection.query(sql, (error, result) => {
            if (error) {
              res.status(500).json({ error });
            } else {
              let mess = ".";
              mailer(email, mess);
              res.status(200).json(result);
            }
          });
        }
      });
    });
  };

  loginUser = (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email= "${email}"`;
    connection.query(sql, (error, result) => {
      if (error) return res.status(500).json(error);
      console.log(result);
      if (!result || result.length === 0 || result[0].is_deleted == 1) {
        res.status(401).json("Usuario no autorizado");
      } else {
        const user = result[0];
        const hash = user.password;

        bcrypt.compare(password, hash, (error, response) => {
          if (error) return res.status(500).json(error);

          if (response == true) {
            const token = jwt.sign(
              {
                user: {
                  user_id: user.user_id,
                  type: user.type,
                },
              },
              process.env.SECRET,
              { expiresIn: "1d" }
            ); //consultar cuanto tiempo queremos que se guarde la contraseña

            res.status(200).json({ token, user });
          } else {
            res.status(401).json("Email o contraseña incorrecta");
          }
          console.log("responseeeeeeeeeee", response); //con esto probamos si la contraseña coincide(true/false)
        });
      }
    });
  };
  oneUser = (req, res) => {
    const user_id = req.params.id;
    console.log("hola usuario", user_id);
  };
  //-------------------------------------------------------------------
  recoverPassword = (req, res) => {
    const { email, password } = req.body;

    bcrypt.genSalt(8, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          let sql = `UPDATE user SET password = '${hash}' WHERE email = '${email}'`;

          connection.query(sql, (error, result) => {
            if (error) {
              return res.status(500).json({ error });
            } else {
              res
                .status(200).json({ mensaje: "Contraseña actualizada con éxito" });
            }
          });
        }
      });
    });
  };
}

module.exports = new usersControllers();
