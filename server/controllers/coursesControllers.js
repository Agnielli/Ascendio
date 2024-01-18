const connection = require('../config/db')

class coursesControllers {


  createCourse = (req, res) => {

    const tags = JSON.parse(req.body.tags)
    const { title, description, price, user_id } = JSON.parse(req.body.crearCurso);
     
    if(req.file){
       const img = req.file.filename;
     }

    let sql = `INSERT INTO course (title, description, price, user_id) VALUES ('${title}', '${description}', ${price}, ${user_id})`

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
      res.status(200)
    })

  }

  callTags = (req, res) =>{
    let sql = `SELECT * FROM tag`

    connection.query(sql, (err, result)=>{
      if(err){
        res.status(500).json(err)
      }else{
        res.status(200).json(result)
      }
    })
  }

  callCourses = (req, res) =>{
    let sql = `SELECT * FROM course WHERE is_completed = 0`
    connection.query(sql, (err, result)=>{
      if(err){
        res.status(500).json(err)
      }else{
        res.status(200).json(result)
      }
    })
  }

  purchaseCourse = (req, res) => {
    const {course_id} = req.body
    console.log(req.body);
    let sql = `UPDATE course SET is_completed = 1 WHERE course_id = ${course_id}`
    connection.query(sql, (err, res)=>{
      if(err){
        res.status(500).json(err)
      }else{
        res.status(200).json(res)
      }
    })
    
  }

  saveCourse = (req, res) => {
    console.log("HI");
  }


}

module.exports = new coursesControllers();