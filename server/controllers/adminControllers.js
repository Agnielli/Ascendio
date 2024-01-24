const connection = require("../config/db");

class adminControllers {
  adminGetAllUsers = (req, res) => {
    let sql = `SELECT * FROM user WHERE type = 2`;
    let sql2 = `SELECT user.*, COUNT(post.post_id) AS total_posts,
    SUM(CASE WHEN post.correct = true THEN 1 ELSE 0 END) AS correct_posts,
    SUM(CASE WHEN post.correct = false THEN 1 ELSE 0 END) AS incorrect_posts
    FROM user LEFT JOIN post ON user.user_id = post.user_id WHERE user.type = 2 GROUP BY
    user.user_id`;
    
    connection.query(sql2, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    });
  };

  adminGetDisabledUsers = (req, res) => {
    let sql = `SELECT * FROM user WHERE type = 2 AND is_disabled = 1`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  adminGetActivatedUsers = (req, res) => {
    let sql = `SELECT * FROM user WHERE type = 2 AND is_disabled = 0`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
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
      (SELECT COUNT(*) FROM user) AS num_users,
      (SELECT COUNT(*) FROM post) AS num_posts,
      (SELECT COUNT(*) FROM course) AS num_courses`;

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
    console.log(user_id);

    let sql = `SELECT 
    (SELECT nickname FROM user WHERE user.user_id = ${user_id}) as usernickname,
    (SELECT message FROM comments WHERE user.user_id = comments.user_id)
    as usermessage`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  adminGetCourses = (req, res) => {
   
    let sql = `SELECT
    course.course_id, course.title, course.user_id, course.description, course.img AS course_img,
    course.date, course.price, course.is_disabled, user.name, user.lastname, user.nickname, user.email
    FROM course LEFT JOIN user ON course.user_id = user.user_id`;
    
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  disableCourse = (req, res) => {
    const { course_id } = req.params
    let sql = `UPDATE course SET is_disabled = 1 WHERE course_id = ${course_id}`

    connection.query(sql,(err, result) => {
      if(err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  }

  enableCourse = (req, res) => {
    const { course_id } = req.params
    let sql = `UPDATE course SET is_disabled = 0 WHERE course_id = ${course_id}`

    connection.query(sql,(err, result) => {
      if(err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  }


}

module.exports = new adminControllers();
