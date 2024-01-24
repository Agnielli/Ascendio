import React, { useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { textSensitive } from "../../../helpers/utils";

export const OneUserCourses = () => {
  const [findCourse, setFindCourse] = useState();
  const [allCoursesOneUser, setAllCoursesOneUser] = useState([]);
  const [filter, setFilter] = useState("");
  const { userCourse, setUserCourse } = useContext(AscendioContext);
  const user_id = useParams().user_id;
  const [course, setCourse] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/oneusercourses/${user_id}`)
      .then((res) => {
        setAllCoursesOneUser(res.data);
        setFindCourse(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const tempArray = allCoursesOneUser.filter((e) => {
      return textSensitive(e.title, filter);
    });
    setFindCourse(tempArray);
  }, [allCoursesOneUser, filter]);


    const deleteCourse = (course_id) => {
      axios
        .put(`http://localhost:3000/courses/deletecourse/${course_id}`)
        .then((res) => {
          console.log(res.data);
          setAllCoursesOneUser(allCoursesOneUser.filter(e=>e.course_id != course_id))
        })
        .catch((err) => {
          console.log(err);
        });
    }
 

  return (
    <section>
      <div className="d-flex justify-content-center p-5">
        <h2>TODOS LOS CURSOS DEL USUARIO: {user_id}</h2>
        <input onChange={handleChange} placeholder="🔍..." value={filter} />
      </div>
      <article className="d-flex justify-content-center gap-2 flex-wrap">
        {findCourse?.map((elem) => {
          return (
            <Card style={{ width: "22rem" }} key={elem.course_id}>
              <Card.Img
                variant="top"
                src={`http://localhost:3000/images/cursos/${elem.img}`}
              />
              <Card.Body>
                <Card.Title> {elem.title} </Card.Title>
                <Card.Subtitle>{elem.tags}</Card.Subtitle>
                <Card.Text>{elem.description}</Card.Text>
                <Card.Text>{elem.price}€</Card.Text>
                <Button
                  onClick={() => navigate(`/course/${elem.course_id}`)}
                  variant="outline-success"
                  className="me-3"
                >
                  Más info
                </Button>
                <Button
                  onClick={() => deleteCourse(elem.course_id)}
                  variant="outline-danger"
                  className="me-3"
                >
                  Eliminar curso
                </Button>
              </Card.Body>
            </Card>
          );
        })}
        {findCourse?.length === 0 && (
          <p>No se han encontrado cursos con estos valores</p>
        )}
      </article>
    </section>
  );
};
