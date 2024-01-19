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
    const  { user_id } = req.params

    let sql = `UPDATE user SET is_disabled = 1 WHERE user_id = ${user_id}`

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
        console.log(result)
      }
    });
  };

  activateUser = (req, res) => {
    const { user_id } = req.params

    let sql = `UPDATE user SET is_disabled = 0 WHERE user_id = ${user_id}`

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(result)
        console.log(result)
      }
    })
  }
}

module.exports = new adminControllers();
