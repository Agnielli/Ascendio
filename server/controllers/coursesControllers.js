const connection = require("../config/db");


class coursesControllers {
  createCourse = (req, res) => {
    const tags = JSON.parse(req.body.tags)
    const { title, description, price, user_id } = JSON.parse(req.body.crearCurso);
    // console.log(tags)
    let img=""
    if(req.file){
       img = req.file.filename;
     }
    let sql = `INSERT INTO course (title, description, price, user_id, img) VALUES ('${title}', '${description}', ${price}, ${user_id}, 'default.jpg')`
    if(req.file !== undefined){
      sql = `INSERT INTO course (title, description, price, user_id, img) VALUES ('${title}', '${description}', ${price}, ${user_id}, '${img}')`
    }
    connection.query(sql, (err, result)=>{
      err && res.status(500).json(err)
      if(err){console.log(err)}
      let course_id = result.insertId
      tags.forEach((elem) =>{
        let sql2 = `INSERT INTO course_tag (course_id, tag_id) VALUES (${course_id}, ${elem.value})`
        connection.query(sql2, (errtag, restag)=>{
          errtag && res.status(500).json(errtag)
          if(errtag){console.log(errtag)}          
        })
      })
      res.status(200).json(result)
    })
  }

  callTags = (req, res) => {
    let sql = `SELECT * FROM tag`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  // allCoursesOneUser = (req,res) =>{
  //   const { user_id } = req.params;
  //   let sql = `SELECT course.* FROM course WHERE user_id = ${user_id} AND is_deleted = 0 `
    
  //   connection.query(sql,(err,result)=>{
  //     if(err){
  //       res.status(500).json(err)
  //     }else{
  //       res.status(200).json(result)
  //     }
  //   })
  // }

  callCourses = (req, res) =>{
    let sql = `SELECT * FROM course WHERE is_disabled = 1 AND is_deleted = 0`
    // TODO is disabled = 0
    connection.query(sql, (err, result)=>{
      if(err){
        res.status(500).json(err)
      }else{
        res.status(200).json(result)
      }
    })
  }

  purchaseCourse = (req, res) => {
    const { id } = req.params;
    let sql = `UPDATE course SET is_completed = 1 WHERE course_id = ${id} AND is_deleted = 0`;
    //TODO: cambiare is_completed con is_bought
    connection.query(sql, (err, result)=>{
      if(err){
        res.status(500).json(err)
      }else{
        res.status(200).json(result)
    }}
  )}
    

  oneCourse = (req, res) => {
    const { course_id } = req.params;
    // console.log(course_id);
    let sql = `SELECT * FROM course WHERE course_id = ${course_id} AND is_deleted = 0` ;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      }
        res.status(200).json(result)

      });
  }
  
  editOneCourse = (req, res) => {
    const { title, description, price, course_id, user_id } = JSON.parse(req.body.editarCurso);
    let sql = `UPDATE course SET title = '${title}', description = '${description}', price = ${price} WHERE course_id = ${course_id} AND user_id = ${user_id} AND is_deleted = 0`;
    
    let img
    if (req.file) {
      img = req.file.filename
      sql = `UPDATE course SET title = '${title}', description = '${description}', price = ${price}, img = '${img}' WHERE course_id = ${course_id} AND user_id = ${user_id} AND is_deleted = 0`
    }
    connection.query(sql, (err, result) => {
      if (err) {
        console.log("Error en la consulta SQL:", err);
        return res.status(500).json(err);
      }
      res.status(200).json({ result, img: req.file ? req.file.filename : null });
    });
  }

  addSection = (req, res) => {
    //no se si la ruta es dínamica
    console.log("****", req.body);
    const {course_id, section_id, section_title} = req.body
    //llega sólo el section_title. Los demás valores: undefined
    let sql = `INSERT INTO section (course_id, section_id, section_title) VALUES ('${course_id}', '${section_id}', '${section_title}')`

    connection.query(sql, (err, result)=>{
      if(err){
        res.status(500).json(err)
      }else{
        res.status(200).json(result)
      }
    })
  }

}
module.exports = new coursesControllers();

