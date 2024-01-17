const connection = require('../config/db')

class coursesControllers {

  createCourse = (req, res) => {
     const { title, description, price, user_id } = JSON.parse(req.body.crearCurso);

     let sql = `INSERT INTO course (title, description, price, user_id) VALUES ('${title}', '${description}', ${price}, ${user_id})`

  }

}

module.exports = new coursesControllers();