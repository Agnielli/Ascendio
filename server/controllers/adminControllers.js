const connection = require("../config/db");
class adminControllers {
  adminGetAllUsers = (req, res) => {
    let sql = `SELECT * FROM user WHERE type = 2`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    });
  };

  disableUser = (req, res) => {
    const { user_id } = req.params;

    let sql = `UPDATE user SET is_disabled = 1 WHERE user_id = ${user_id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
        console.log(result);
      }
    });
  };

  activateUser = (req, res) => {
    const { user_id } = req.params;

    let sql = `UPDATE user SET is_disabled = 0 WHERE user_id = ${user_id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
        console.log(result);
      }
    });
  };

  allStats = (req, res) => {
    let sql = `SELECT
      (SELECT COUNT(user_id) FROM user WHERE type = 2) as count_type_2,
      (SELECT COUNT(user_id) FROM user WHERE type = 1) as count_type_1,
      (SELECT COUNT(post.post_id) FROM post, comments WHERE post.post_id = comments.post_id AND post.is_disabled = 0) as count_posts,
      (SELECT COUNT(course_id) FROM course WHERE is_disabled = 0) as course_count,
      (SELECT COUNT(comments.comment_id) FROM post, comments WHERE post.post_id = comments.post_id AND post.is_disabled = 0) as count_comments
  `;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  adminComments = (req, res) => {
  let sql = `SELECT * FROM comments`;
  let sql2 = `SELECT * FROM user`;

  let commentsData;
  let userData;

  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      commentsData = result;

      connection.query(sql2, (err2, result2) => {
        if (err2) {
          res.status(500).json(err2);
        } else {
          userData = result2;

          // Enviar la respuesta una vez que ambas consultas hayan completado
          res.status(200).json({ comments: commentsData, users: userData });
        }
      });
    }
  });
};
  

  oneComment = (req, res) => {
    const { user_id } = req.params;
    console.log( user_id)

    let sql = `SELECT 
    (SELECT nickname FROM user WHERE user.user_id = ${user_id}) as usernickname,
    (SELECT message FROM comments WHERE user.user_id = comments.user_id)
    as usermessage`;

    connection.query(sql, (err, result) => {
      if(err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  };
}

module.exports = new adminControllers();
