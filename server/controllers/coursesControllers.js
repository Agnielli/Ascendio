const connection = require("../config/db");
class coursesControllers {
  createCourse = (req, res) => {
    const tags = JSON.parse(req.body.tags);
    const { title, description, price, user_id } = JSON.parse(
      req.body.crearCurso
    );
    //posible validación en el back con reg.ex https://medium.com/codex/using-regular-expressions-in-javascript-edcd5942de89
    let sql = `INSERT INTO course (title, description, price, user_id, img) VALUES ('${title}', '${description}', ${price}, ${user_id}, 'default.jpg')`;
    if (req.file !== undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO course (title, description, price, user_id, img) VALUES ('${title}', '${description}', ${price}, ${user_id}, '${img}')`;
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
  oneCourse = (req, res) => {
    const { course_id } = req.params; //añadir el usuario que está logueado
    // console.log(course_id);
    let sql = `SELECT course.title, course.img, course.date, course.is_completed, course.description, course.price , section.section_id, section.section_title, topic.topic_id, topic.topic_title
    FROM course
    left join section on course.course_id = section.course_id
    left join topic  on topic.course_id = section.course_id and topic.section_id = section.section_id
    WHERE  course.course_id = ${course_id} AND is_deleted = 0 ;`;
    /* let sql = `SELECT course.title, course.img, course.date, course.is_completed, course.description, course.price , section.section_id, section.section_title, tag.tag_id, tag.tag_name
        LEFT JOIN tag ON course_tag.tag_id = tag.tag_id
        LEFT JOIN topic ON course.course_id = topic.course_id
          WHERE course.course_id = ${course_id} AND is_deleted = 0`;
        LEFT JOIN tag ON course_tag.tag_id = tag.tag_id
          WHERE course.course_id = ${course_id} AND is_deleted = 0`; */
    connection.query(sql, (err, result) => {
      console.log("++++++++++++", result);
      if (err) {
        res.status(500).json(err);
      }
      const { title, description, img, date, price, is_completed } = result[0];
      let sections = [];
      let topics = [];
      let last_section_id = null;
      let last_topic_id = null;
      for (let row of result) {
        if (last_section_id != row.section_id && last_section_id != null) {
          topics = [];
        }
        if (last_topic_id != row.topic_id && row.topic_id != null) {
          //console.log(row.topic_id);
          last_topic_id = row.topic_id;
          topics.push({
            topic_id: row.topic_id,
            topic_title: row.topic_title,
          });
        }
        if (last_section_id != row.section_id && row.section_id != null) {
          last_section_id = row.section_id;
          sections.push({
            section_id: row.section_id,
            section_title: row.section_title,
            section_topics: topics,
          });
        }
      }
      let data = {
        title,
        img,
        date,
        price,
        description,
        sections,
      };
      console.log("---------------------------------");
      console.log(data);
      console.log("---------------------------------");
      res.status(200).json(data);
    });
  };
  editOneCourse = (req, res) => {
    const { title, description, price, user_id } = JSON.parse(
      req.body.editarCurso
    );
    const { course_id } = req.params;
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
      console.log("...........", err1);
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
        console.log("...........", err2);
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
  deleteSection = (req, res) => {
    const { course_id, section_id } = req.params;
    let sql = `DELETE FROM section WHERE course_id = ${course_id} and section_id =${section_id}`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };
  addTopic = (req, res) => {
    const { course_id, newTopic, section_id } = req.body;
    let sql_cont = `SELECT max(topic_id) as id FROM topic WHERE section_id = ${section_id}`;
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
  oneUserCourses = (req, res) => {
    const { user_id } = req.params;
    console.log("EEEEEEEEEEEEEA", req.params);
    let sql = `SELECT * FROM course where user_id = ${user_id} AND is_deleted = 0;`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };
  deleteCourse = (req, res) => {
    const { course_id } = req.params;
    let sql = `UPDATE course
      LEFT JOIN  section ON course.course_id = section.course_id
      LEFT JOIN course_tag ON course.course_id = course_tag.course_id
      LEFT JOIN tag ON course_tag.tag_id = tag.tag_id
      LEFT JOIN topic ON course.course_id = topic.course_id
        SET course.is_deleted = 1
          WHERE course.course_id = ${course_id};`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };
  
  deleteTopic = (req, res) => {
    const { course_id, section_id, topic_id } = req.params;
    let sql = `DELETE FROM topic WHERE course_id = ${course_id} and section_id =${section_id} AND topic_id = ${topic_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };
  getWishCourse = (req, res) => {
    const { course_id, user_id } = req.params;
    let sql = `SELECT * FROM user_wishes_course WHERE user_id = ${user_id} and course_id = ${course_id}`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };
  addWishesCourse = (req, res) => {
    const { course_id } = req.params;
    const { usuario } = req.body;
    let sql = `INSERT INTO user_wishes_course (user_id, course_id) VALUES (${usuario}, ${course_id})`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };
  delFromWishes = (req, res) => {
    const { course_id } = req.params;
    const { usuario } = req.body;
    let sql = `DELETE FROM user_wishes_course WHERE course_id = ${course_id} and user_id = ${usuario}`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };
  getAllTagsOneCourse = (req, res) => {
    const { course_id } = req.params;
    let sql = `SELECT tag.tag_id, tag.tag_name
    FROM tag
      LEFT JOIN  course_tag ON course_tag.tag_id = tag.tag_id
        WHERE course_tag.course_id = ${course_id}`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };
  addToPurchaseCourse = (req, res) => {
    const { course_id } = req.params;
    const { usuario } = req.body;
    let sql = `INSERT INTO user_enrolls_course (user_id, course_id) VALUES (${usuario}, ${course_id})`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };
  getPurchaseCourse = (req, res) => {
    const { course_id, user_id } = req.params;
    let sql = `SELECT * FROM user_enrolls_course WHERE user_id = ${user_id} and course_id = ${course_id}`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  disableOneCourse = (req, res) => {
    const { course_id } = req.params
    let sql = `UPDATE course SET is_disabled = 1 WHERE course_id = ${course_id}`
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  }

  
  addResourcePdf = (req, res) =>{
    console.log("hi");
    ///multer acept pdf en el input
  }
  addResourceVideo = (req, res) => {
    console.log("ppp");
    //sin modal
  }
  deleteResource = (req, res) =>{
    console.log("hh");
  }


  addResourcePdf = (req, res) =>{
    console.log("hi");
    ///multer acept pdf en el input
  }

  addResourceVideo = (req, res) => {
    console.log("ppp");
    //sin modal
  }

  deleteResource = (req, res) =>{
    console.log("hh");
  }

  


}
module.exports = new coursesControllers();