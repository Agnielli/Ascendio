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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Correo no valido" });
      } else {
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
                        mailer(email, nickname, mess);
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
      }
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
            const nickname = result[0].nickname;
            const token = jwt.sign(result[0].user_id, process.env.T_PASS);
            let mess = `http://localhost:5173/recoverpassword/${token}`;
            if (result != "") {
              recoverMailer(email, nickname, mess);
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
    jwt.verify(token, process.env.T_PASS, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Token no válido" });
      } else {
        const user_id = decoded;
        let sql = `SELECT * FROM user WHERE user_id = '${user_id}'`;
        connection.query(sql, (err, result) => {
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
  followUser = (req, res) => {
    const user_id = req.body[0];
    const id_followed = req.body[1];
    console.log(user_id, id_followed);

    let sql = `INSERT INTO user_follows_user (user_id, followed_user_id) VALUES (${user_id}, ${id_followed});`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  // comprobar con los console.log
  unfollowUser = (req, res) => {
    const user_id = req.body[0];
    const id_followed = req.body[1];
    console.log(user_id, id_followed);

    let sql = `DELETE FROM user_follows_user WHERE user_id = ${user_id} and followed_user_id = ${id_followed}`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  getFollowUser = (req, res) => {
    // const user_id = req.body;
    const user_id = req.params.id;

    let sql = `SELECT * FROM user_follows_user WHERE user_id = ${user_id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  //4-editar info de un usuario:

  editUser = (req, res) => {
    const { nickname, name, lastname, email, phonenumber, user_id } =
      JSON.parse(req.body.editUser);
    let sql;
    let img;

    if (req.file) {
      img = req.file.filename;
      sql = `UPDATE user SET nickname = "${nickname}", name = "${name}", lastname = "${lastname}", email = "${email}", phonenumber = ${
        phonenumber !== null ? `"${phonenumber}"` : null
      }, img = "${img}" WHERE user_id = ${user_id}`;
    } else {
      sql = `UPDATE user SET nickname = "${nickname}", name = "${name}", lastname = "${lastname}", email = "${email}", phonenumber = ${
        phonenumber !== null ? `"${phonenumber}"` : null
      } WHERE user_id = ${user_id} AND (img IS NULL OR img = "")`;
    }
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        console.log("*********************", img);
        res.status(200).json({ result, img });
      }
    });
  };

  // -------------
  getStatisticsUser = (req, res) => {
    try {
      const { id } = req.params;
      const user_id = id;
      let sql = `SELECT (SELECT COUNT(*) FROM user_follows_user WHERE followed_user_id = '${user_id}') AS num_followers, (SELECT COUNT(*) FROM post WHERE user_id = '${user_id}') AS num_posts, (SELECT COUNT(*) FROM course WHERE user_id = '${user_id}') AS num_courses, (SELECT COUNT(*) FROM post WHERE user_id = '${user_id}' AND correct = true) AS num_correct_posts, (SELECT COUNT(*) FROM post WHERE user_id = '${user_id}' AND correct = false) AS num_incorrect_posts, (SELECT COUNT(DISTINCT followed_user_id) FROM user_follows_user WHERE user_id = '${user_id}') AS num_following_users;`;
      connection.query(sql, (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json({ datos: result[0] });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).JSON({ message: "Error inesperado (CATCH)" });
    }
  };

  verifyPassword = (req, res) => {
    const { id } = req.params;
    const { currentPassword } = req.body;

    // Buscar el usuario por ID
    let sql = `SELECT * FROM user WHERE user_id = ${id}`;
    connection.query(sql, [id], (error, result) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Error en la verificación de la contraseña" });
      }

      // Verificar si el usuario existe
      if (result.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const user = result[0];
      const hash = user.password;

      // Verificar la contraseña
      bcrypt.compare(currentPassword, hash, (error, response) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ error: "Error en la verificación de la contraseña" });
        }

        if (response) {
          const token = jwt.sign(
            {
              user: {
                user_id: user.user_id,
                type: user.type,
              },
            },
            process.env.SECRET,
            { expiresIn: "1d" }
          );

          res.status(200).json({ token, user });
        } else {
          res.status(401).json({ message: "Contraseña actual incorrecta" });
        }
      });
    });
  };

  // Cambiar contraseña
  updatePassword = (req, res) => {
    const { id, password } = req.body;

    // Consultar el usuario por user_id
    let sql = `SELECT * FROM user WHERE user_id = ${id}`;
    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al consultar el usuario" });
      }

      // Verificar si el usuario existe
      if (result.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Generar el hash de la nueva contraseña
      bcrypt.genSalt(8, (err, salt) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          }

          // Actualizar la contraseña en la base de datos
          let sql2 = `UPDATE user SET password = '${hash}' WHERE user_id = ${id}`;
          connection.query(sql2, [hash, id], (error, result) => {
            if (error) {
              return res.status(500).json({ error });
            }

            res
              .status(200)
              .json({ mensaje: "Contraseña actualizada con éxito" });
          });
        });
      });
    });
  };


  getFollowersUser = (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT * FROM user WHERE user_id IN (SELECT user_id FROM user_follows_user WHERE followed_user_id = '${id}');`;
      connection.query(sql, (error, result) => {
        if (error) {
          console.log("Error en sql", error);
          res.status(400).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json({ datos: result });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).JSON({ message: "Error inesperado (CATCH)" });
    }
  };

  getFollowingUser = (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT * FROM user WHERE user_id IN (SELECT followed_user_id FROM user_follows_user WHERE user_id = ${id});`;
      let sql2 = `SELECT * FROM user WHERE user_id IN (SELECT user_id FROM user_follows_user WHERE followed_user_id = ${id});`;
      connection.query(sql, (error, result) => {
        if (error) {
          console.log("Error en sql", error);
          res.status(400).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json({ datos: result });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).JSON({ message: "Error inesperado (CATCH)" });
    }
  };

  getPostsUser = (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT post.*, post_resource.resource_type, post_resource.text as resource_text, category.category_name FROM post LEFT JOIN post_resource ON post.post_id = post_resource.post_id LEFT JOIN category ON post.category_id = category.category_id WHERE post.user_id = ${id};`;
      connection.query(sql, (error, result) => {
        if (error) {
          console.log("Error en sql", error);
          res.status(400).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json({ datos: result });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).JSON({ message: "Error inesperado (CATCH)" });
    }
  };

  getPostsUser = (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT post.*, post_resource.resource_type, post_resource.text as resource_text, category.category_name FROM post LEFT JOIN post_resource ON post.post_id = post_resource.post_id LEFT JOIN category ON post.category_id = category.category_id WHERE post.user_id = ${id};`;
      connection.query(sql, (error, result) => {
        if (error) {
          console.log("Error en sql", error);
          res.status(400).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json({ datos: result });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).JSON({ message: "Error inesperado (CATCH)" });
    }
  };

  showAllUsers = (req, res) => {
    try {
      let sql = `SELECT user.*, (SELECT COUNT(*) FROM post WHERE user.user_id = post.user_id) AS total_posts, (SELECT COUNT(*) FROM post WHERE user.user_id = post.user_id AND post.correct = true) AS correct_posts,( SELECT COUNT(*) FROM post WHERE user.user_id = post.user_id AND post.correct = false) AS incorrect_posts, ( SELECT COUNT(*) FROM user_follows_user WHERE user.user_id = user_follows_user.user_id) AS following_count, ( SELECT COUNT(*) FROM user_follows_user WHERE user.user_id = user_follows_user.followed_user_id) AS followers_count, ( SELECT COUNT(*) FROM course WHERE user.user_id = course.user_id ) AS total_courses FROM user;`;
      connection.query(sql, (err, result) => {
        if (err) {
          res.status(500).json({ message: "Error en la SQL" });
        } else {
          console.log(result);
          res.status(200).json(result);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error al enviar el correo electrónico de registro",
      });
    }
  };
}

module.exports = new usersControllers();
