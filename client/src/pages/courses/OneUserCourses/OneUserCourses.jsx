import React, { useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Col } from "react-bootstrap";
import { textSensitive } from "../../../helpers/utils";
import { ModalDelOneCourse } from "../../../components/ModalDelOneCourse/ModalDelOneCourse";
import './OneUserCourses.scss'
import "../../../../public/stylesheets/ButtonsApp.scss";

export const OneUserCourses = () => {
  const [findCourse, setFindCourse] = useState();
  const [allCoursesOneUser, setAllCoursesOneUser] = useState([]);
  const [filter, setFilter] = useState("");
  const { userCourse, setUserCourse } = useContext(AscendioContext);
  const user_id = useParams().user_id;
  const [course, setCourse] = useState();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const course_id = useParams().course_id;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/oneusercourses/${user_id}`)
      .then((res) => {
        setAllCoursesOneUser(res.data);
        setFindCourse(res.data);
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
        setAllCoursesOneUser(
          allCoursesOneUser.filter((e) => e.course_id != course_id)
        );
        setShowModalDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openModalDelete = (elem_id) => {
    setShowModalDelete(elem_id);
  };

  return (
    <Col>
    <header className="headerAllCoursesOneUser">
    <div
          className="d-flex justify-content-between p-5"
          style={{ color: "white" }}
        >
        <h2>Mis cursos</h2>
        <input onChange={handleChange} placeholder="🔍..." value={filter} />
      </div>
      </header>
      <main className="mainAllCoursesOneUser d-flex flex-wrap justify-content-center gap-3 pb-5">
        {findCourse?.map((elem) => {
          return (
            <Card style={{ width: "22rem" }} key={elem.course_id} className="mapeoAllCourseOneUser text-center">
              <Card.Img
                style={{ height: "16rem", objectFit: "cover" }}
                variant="top"
                src={`http://localhost:3000/images/cursos/${elem.img}`}
              />
             <Card.Body className="d-flex flex-column gap-1">
                <Card.Text> {elem.title} </Card.Text>
                <Card.Subtitle className="tagsCourse">{elem.tags}</Card.Subtitle>
                <Card.Title className="descriptioncard">{elem.description}</Card.Title>
                <Card.Text className="priceCourse px-3 my-2">
                  {Number(elem?.price) === 0
                  ? "GRATIS"
                  : `${elem?.price}€`}
                </Card.Text>
                <Card.Text className="d-flex justify-content-between mt-auto">
                <Button
                  onClick={() => navigate(`/course/${elem.course_id}`)}
                  className="Button3"
                >
                  Más info
                </Button>
                <Button
                  onClick={() => openModalDelete(elem.course_id)}
                  className="Button3"
                >
                  Eliminar curso
                </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
        {showModalDelete && (
          <ModalDelOneCourse
            showModalDelete={showModalDelete}
            setShowModalDelete={setShowModalDelete}
            deleteCourse={deleteCourse}
            course_id={showModalDelete}
          />
        )}
        {findCourse?.length === 0 && (
          <p>No se han encontrado cursos con estos valores</p>
        )}
      </main>
    </Col>
  );
};
