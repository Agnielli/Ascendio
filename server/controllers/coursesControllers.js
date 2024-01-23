const connection = require("../config/db");

class coursesControllers {
  createCourse = (req, res) => {

    const tags = JSON.parse(req.body.tags)
    const { title, description, price, user_id } = JSON.parse(req.body.crearCurso);

    //posible validación en el back con reg.ex https://medium.com/codex/using-regular-expressions-in-javascript-edcd5942de89

    let sql = `INSERT INTO course (title, description, price, user_id, img) VALUES ('${title}', '${description}', ${price}, ${user_id}, 'default.jpg')`
    if(req.file !== undefined){
     let img = req.file.filename;
      sql = `INSERT INTO course (title, description, price, user_id, img) VALUES ('${title}', '${description}', ${price}, ${user_id}, '${img}')`
     }
    
    connection.query(sql, (err, result) => {
      err && res.status(500).json(err);
      if (err) {
        console.log(err);
      }
      let course_id = result.insertId;

      tags.forEach((elem) => {
        let sql2 = `INSERT INTO course_tag (course_id, tag_id) VALUES (${course_id}, ${elem.value})`;
        connection.query(sql2, (errtag, restag) => {
          errtag && res.status(500).json(errtag);
          if (errtag) {
            console.log(errtag);
          }
        });
      });
      res.status(200).json(result);
    });
  };

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

  callCourses = (req, res) => {
    let sql = `SELECT * FROM course WHERE is_disabled = 1 AND is_deleted = 0`;
    // TODO is disabled = 0
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
   
    /* let sql = `SELECT course.title, course.img, course.description, course.price , tag.tag_id, tag.tag_name
        FROM course 
        LEFT JOIN course_tag ON course.course_id = course_tag.course_id 
        LEFT JOIN tag ON course_tag.tag_id = tag.tag_id   
          WHERE is_deleted = 0`;

    // TODO is disabled = 0
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      }
      const { title, description, img, price } = result;

      let data = {
        title,
        img,
        price,
        description,
        tags: [],
      };
      result.forEach((elem) => {
        if (elem.tag_id != null) {
          data.tags.push({ tag_id: elem.tag_id, tag_title: elem.tag_name });
        }
        console.log("ESTA ES MI DATA TOTAL", data);
      res.status(200).json(data);
      });
    }); */
  };

  purchaseCourse = (req, res) => {
    const { id } = req.params;
    let sql = `UPDATE course SET is_completed = 1 WHERE course_id = ${id} AND is_deleted = 0`;
    //TODO: cambiare is_completed con is_bought
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  oneCourse = (req, res) => {
    const { course_id, user_id } = req.params; //añadir el usuario que está logueado
    // console.log(course_id);
    /* let sql = `SELECT course.title, course.img, course.date, course.is_completed, course.description, course.price , section.section_id, section.section_title FROM course LEFT JOIN  section ON course.course_id = section.course_id WHERE course.course_id = ${course_id} AND is_deleted = 0` ; */
    let sql = `SELECT course.title, course.img, course.date, course.is_completed, course.description, course.price , section.section_id, section.section_title, tag.tag_id, tag.tag_name
      FROM course 
        LEFT JOIN  section ON course.course_id = section.course_id 
        LEFT JOIN course_tag ON course.course_id = course_tag.course_id 
        LEFT JOIN tag ON course_tag.tag_id = tag.tag_id   
          WHERE course.course_id = ${course_id} AND is_deleted = 0`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      }

      const { title, description, img, date, price, is_completed } = result[0];

      let data = {
        title,
        img,
        date,
        price,
        description,
        tags: [],
        sections: [],
      };
      result.forEach((elem) => {
        if (elem.tag_id != null) {
          data.tags.push({ tag_id: elem.tag_id, tag_title: elem.tag_name });
        }
      });

      result.forEach((elem) => {
        if (elem.section_id != null) {
          data.sections.push({
            section_id: elem.section_id,
            section_title: elem.section_title,
          });
        }
      });
      console.log("ESTA ES MI DATA TOTAL", data);
      res.status(200).json(data);
    });
  };

        
  editOneCourse = (req, res) => {

    const { title, description, price, user_id } = JSON.parse(req.body.editarCurso);
    const {course_id} = req.params;
    
    let sql = `UPDATE course SET title = '${title}', description = '${description}', price = ${price} WHERE course_id = ${course_id} AND user_id = ${user_id} AND is_deleted = 0`;

    let img;
    if (req.file) {
      img = req.file.filename;
      sql = `UPDATE course SET title = '${title}', description = '${description}', price = ${price}, img = '${img}' WHERE course_id = ${course_id} AND user_id = ${user_id} AND is_deleted = 0`;
    }
    connection.query(sql, (err, result) => {
      if (err) {
        console.log("Error en la consulta SQL:", err);
        return res.status(500).json(err);
      }
      res
        .status(200)
        .json({ result, img: req.file ? req.file.filename : null });
    });
  };

  addSection = (req, res) => {
    const { course_id, newSection } = req.body;

    let sql_cont = `SELECT max(section_id) as id FROM section WHERE course_id = ${course_id}`;

    connection.query(sql_cont, (err1, result) => {
      if (err1) {
        return res.status(500).json(err1);
      }

      let section_id = result[0].id;
      if (section_id == null) {
        section_id = 1;
      } else {
        section_id++;
      }
      //console.log(section_id);
      let sql_insert = `INSERT INTO section (course_id, section_id, section_title) VALUES (${course_id} , ${section_id} , "${newSection}")`;

      connection.query(sql_insert, (err2, result_insert) => {
        if (err2) {
          return res.status(500).json(err2);
        }
        res.status(201).json({ result_insert, section_id });
      });
    });
  };

  viewPurchasedCourse = (req, res) => {
    let sql = `SELECT * FROM course WHERE is_completed = 1 AND is_deleted = 0`;
    //TODO: cambiare is_completed con is_bought`
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  //este controlador es para los cursos guardados como favoritos
  viewSavedCourse = (req, res) => {
    let sql = `SELECT * FROM course WHERE IS_LIKED = 1 AND is_deleted = 0`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  deleteSection = (req, res) => {
    const { course_id, section_id } = req.params;
    console.log("PARAMS", req.params);
    let sql = `DELETE FROM section WHERE course_id = ${course_id} and section_id =${section_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  addTopic = (req, res) => {
    const { course_id, newTopic, section_id } = req.body;
    let sql_cont = `SELECT max(topic_id) as id FROM topic WHERE section_id = ${section_id}`;
    
    console.log(req.body)

    connection.query(sql_cont, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      let topic_id = result[0].id;
      if (topic_id == null) {
        topic_id = 1;
      } else {
        topic_id++;
      }

      let sql_insert = `INSERT INTO topic (course_id, section_id, topic_id, topic_title) VALUES (${course_id}, ${section_id}, ${topic_id}, "${newTopic}")`;

      connection.query(sql_insert, (err2, result_insert) => {
        if (err2) {
          return res.status(500).json(err2);
        }
        res.status(201).json({ result_insert, topic_id });
      });
    });
  };
}
module.exports = new coursesControllers();
