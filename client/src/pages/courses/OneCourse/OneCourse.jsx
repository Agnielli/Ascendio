import React, { useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { EditOneCourse } from "../../../components/ModalEditOneCourse/EditOneCourse";
import { useParams } from "react-router-dom";

export const OneCourse = () => {
  const [oneCoursePpal, setOneCoursePpal] = useState();
  // const { user, setUser,userCourse,setUserCourse } = useContext(AscendioContext);
  const [showModal, setShowModal] = useState(false)
  const course_id = useParams().course_id;
  const [guardado, setGuardado] = useState({});
  const [courseToEdit, setCourseToEdit] = useState()

  const openModal = () =>{
    setShowModal(true)
    setCourseToEdit()
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/onecourse/${course_id}`)
      .then((res) => {
        setOneCoursePpal(res.data[0]);
        setCourseToEdit(res.data[0])
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showModal]);

  const formatearFecha = (date) => {
    return date.split("T")[0].split("-").reverse().join("-");
  };

  const guardar = (courseId) => {
    setGuardado((prevGuardado) => ({
      ...prevGuardado,
      [courseId]: !prevGuardado[courseId],
    }));
  };

  return (
    <>
      <h2>
        AQUI QUIERO EL CURSO QUE ACABO DE CREAR EN EL FORMULARIO EDITAR CURSO
        con el id {oneCoursePpal?.course_id}{" "}
      </h2>
      <Card style={{ width: "40rem" }}>
        <Card.Img
          variant="top"
          src={`http://localhost:3000/images/cursos/${oneCoursePpal?.img}`}
        />
        <Card.Body>
          <Card.Title> Title: {oneCoursePpal?.title} </Card.Title>
          <Card.Subtitle>
            {oneCoursePpal && "Creado:" + formatearFecha(oneCoursePpal.date)}
          </Card.Subtitle>
          <Card.Text>{oneCoursePpal?.description}</Card.Text>
          <Card.Text>{oneCoursePpal?.price}€</Card.Text>

          <Button variant="primary" onClick={openModal}>Editar curso</Button>
          <Button variant="primary">Añadir Tema</Button>
          
          {guardado[course_id] ? (
            <Button
              onClick={() => guardar(course_id)}
              variant="outline-success"
              className="me-3"
            >
              Quitar de favoritos
            </Button>
          ) : (
            <Button
              onClick={() => guardar(course_id)}
              variant="outline-success"
              className="me-3"
            >
              Guardar entre favoritos
            </Button>
          )}
        </Card.Body>
      </Card>

      <EditOneCourse 
        showModal = {showModal}
        setShowModal = {setShowModal}
        setOneCoursePpal = {setOneCoursePpal}
        oneCoursePpal = {oneCoursePpal}
      />
    </>
  );
};
