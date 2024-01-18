const connection = require("../config/db");

class adminControllers {
  adminGetAllUsers = (req, res) => {

    let sql = `SELECT nickname, img, user_id FROM user WHERE type = 2 AND is_disabled = 0`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    });
  };

  delUser = (req, res) => {
    const  { user_id } = req.params
    console.log(user_id)

    let sql = `UPDATE user SET is_disabled = 1 WHERE user_id = ${user_id}`

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };
}

module.exports = new adminControllers();
