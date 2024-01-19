const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/nodemailer");
const recoverMailer = require("../utils/nodemailerRecover");
require("dotenv").config();

class usersControllers {
  // ---------------------------------------------------------------
  // 1.-crear un usuario
  createUser = (req, res) => {
    try {
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
                res.status(500).json({ message: "Error en sql" });
              } else {
                let sql2 = `select * from user where email = '${email}'`;
                connection.query(sql2, (error2, result2) => {
                  if (error2) {
                    console.log(error2);
                    res.status(500).json({ message: "Error en sql2" });
                  } else {
                    console.log(result2[0].email);
                    const token = jwt.sign(
                      result2[0].email,
                      process.env.T_PASS
                    );
                    let mess = `http://localhost:5173/confirmationuser/${token}`;
                    if (result != "") {
                      mailer(email, mess);
                      res.status(200).json({
                        message:
                          "Usuario registrado con exito, email de confirmación enviado",
                      });
                    } else {
                      res.status(400).json({
                        message:
                          "No se ha podido registrar el usuario por algun motivo",
                      });
                    }
                  }
                });
              }
            });
          }
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error al enviar el correo electrónico de registro",
      });
    }
  };

  confirmateUser = (req, res) => {
    const { token } = req.params;
    jwt.verify(token, process.env.T_PASS, (err, decoded) => {
      console.log(decoded);
      if (err) {
        res.status(401).json({ message: "Token no válido" });
      } else {
        const email = decoded;
        console.log(email);
        let sql = `SELECT * FROM user WHERE email = '${email}'`;
        connection.query(sql, (error, result) => {
          if (error) {
            console.log(error);
            res.status(400).json({ message: "Error en sql" });
          } else if (result.length === 0) {
            res.status(404).json({ message: "Usuario no encontrado" });
          } else {
            let sql2 = `UPDATE user SET is_confirmed = true WHERE user_id = '${result[0].user_id}'`;
            connection.query(sql2, (error2, result2) => {
              if (error2) {
                console.log(error);
                res.status(400).json({ message: "Error en sql2" });
              } else {
                res
                  .status(200)
                  .json({ message: "Usuario confirmado con exito" });
              }
            });
          }
        });
      }
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
    let sql = `SELECT * FROM user WHERE user_id = ${user_id} AND is_deleted = 0`;
    connection.query(sql, (err, result) => {
      err ? res.status(400).json({ err }) : res.status(200).json(result[0]);
    });
  };

  //-------------------------------------------------------------------
  mailRecoverPassword = (req, res) => {
    try {
      const { email } = req.body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Aseguramos que llega un correo electrónico válido.
      if (!emailRegex.test(email)) {
        res
          .status(400)
          .json({ error: "Formato de correo electrónico inválido" });
      } else {
        let sql = `SELECT * FROM user WHERE email = '${email}'`;

        connection.query(sql, (error, result) => {
          if (error) {
            res.status(500).json({ error });
          } else {
            console.log(result[0].user_id);
            const token = jwt.sign(result[0].user_id, process.env.T_PASS);
            let mess = `http://localhost:5173/recoverpassword/${token}`;
            if (result != "") {
              recoverMailer(email, mess);
              res.status(200).json({ message: "Email recibido correctamente" });
            } else {
              res.status(400).json({ message: "Email no existe en la DB" });
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error al enviar el correo electrónico de recuperación",
      });
    }
  };

  recoverPassword = (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    console.log(token);
    jwt.verify(token, process.env.T_PASS, (err, decoded) => {
      console.log(decoded);
      if (err) {
        res.status(401).json({ message: "Token no válido" });
      } else {
        const user_id = decoded;
        let sql = `SELECT * FROM user WHERE user_id = '${user_id}'`;
        connection.query(sql, (err, result) => {
          console.log(result);
          if (err) {
            console.log(err);
          } else if (result.length === 0) {
            res.status(400).json({ message: "Usuario no existe en la DB" });
          } else {
            bcrypt.genSalt(8, (err, salt) => {
              bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                  res.status(500).json({ error: err });
                } else {
                  let sql2 = `UPDATE user SET password = '${hash}' WHERE user_id = '${user_id}'`;
                  connection.query(sql2, (error, result) => {
                    if (error) {
                      res.status(500).json({ error });
                    } else {
                      res
                        .status(200)
                        .json({ mensaje: "Contraseña actualizada con éxito" });
                    }
                  });
                }
              });
            });
          }
        });
      }
    });
  };

  // ---------------------------------------------
  //4-editar info de un usuario:
  editUser = (req, res) => {
    const {nickname, name, lastname, email, phonenumber, user_id} = JSON.parse(req.body.editUser)
    let sql = `UPDATE user SET nickname = "${nickname}" , name = "${name}", lastname = "${lastname}", email = "${email}", phonenumber = "${phonenumber}" WHERE user_id = ${user_id}`

    let img

    if (req.file){
        img = req.file.filename;
        sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", address = "${address}", user_city = "${user_city}", img = "${img}" WHERE user_id = ${user_id}`
    }

    connection.query(sql, (err, result) => {
        if(err) {
            res.status(400).json(err)
        }
        else {
            res.status(200).json({result, img})
        }
    })

}

}

module.exports = new usersControllers();
