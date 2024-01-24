const connection = require("../config/db");
require("dotenv").config();

class CommentsControllers {
  createComment = (req, res) => {
    try {
      console.log(req.body);

      const comentario = req.body.comment.message;
      const post_id = req.body.oneTrade.post_id;
      const user_id = req.body.oneTrade.user_id;

      let sql = `SELECT COUNT(*) AS num_comentarios
      FROM comments
      WHERE post_id = ${post_id};`;

      connection.query(sql, (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json({ message: "Error en la SQL" });
        } else {
          let numComentarios = parseInt(result[0].num_comentarios) + 1;
          let sql2 = `INSERT INTO comments (comment_id, user_id, post_id, date, message) VALUES (${numComentarios}, ${user_id}, ${post_id}, NOW(), '${comentario}');`;
          connection.query(sql2, (error, result) => {
            if (error) {
              console.log(error);
              res.status(400).json({ message: "Error en la SQL2" });
            } else {
              res
                .status(200)
                .json({ message: "Comentario creado", result: result });
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error del Catch",
      });
    }
  };

  showAllComments = (req,res) =>{
    const post_id = req.params.id
    let sql = `select * from comments WHERE post_id = ${post_id}`;
    let sql2 = `SELECT comments.*, user.nickname FROM comments JOIN user ON comments.user_id = user.user_id WHERE comments.post_id = ${post_id};`
    connection.query(sql2,(error, result) =>{
      if (error) {
        console.log(error);
        res.status(400).json({ message: "Error en la SQL2" });
      } else {
        res
          .status(200)
          .json({ message: "Todos los comentarios", result: result });
      }
    })
  }

}

module.exports = new CommentsControllers();
