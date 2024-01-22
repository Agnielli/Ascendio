import React, { useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { EditOneCourse } from "../../../components/ModalEditOneCourse/EditOneCourse";
import { useParams } from "react-router-dom";
import { FormAddSection } from "../../../components/FormAddSection/FormAddSection";

export const OneCourse = () => {
  const [oneCoursePpal, setOneCoursePpal] = useState();
  // const { user, setUser,userCourse,setUserCourse } = useContext(AscendioContext);
  const [showModal, setShowModal] = useState(false);
  const course_id = useParams().course_id;
  const [guardado, setGuardado] = useState({});
  const [courseToEdit, setCourseToEdit] = useState();
  const [addSection, setAddSection] = useState(false);
  const [sections, setSections] = useState([]);
  const [resetCourse, setResetCourse] = useState(false)

  const openModal = () => {
    setShowModal(true);
    setCourseToEdit();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/onecourse/${course_id}`)
      .then((res) => {
        console.log(res.data);
        setOneCoursePpal(res.data);
        setCourseToEdit(res.data);
        setSections(res.data.sections);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showModal, resetCourse]);

  const formatearFecha = (date) => {
    return date.split("T")[0].split("-").reverse().join("-");
  };

  const guardar = (courseId) => {
    setGuardado((prevGuardado) => ({
      ...prevGuardado,
      [courseId]: !prevGuardado[courseId],
    }));
  };

  const addNewSection = () => {
   setAddSection(true)
  }

  const deleteSection = (section_id) =>{
    axios
      .delete(`http://localhost:3000/courses/deletesection/${course_id}/${section_id}`)
      .then((res)=>{
        console.log(res.data);
        setResetCourse(!resetCourse)
      })
      .catch((err)=>{
        console.log(err);
      })
  }


  return (
    <>
      <section className="d-flex flex-column align-items-center justify-content-center p-5">
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

            <Button
              variant="outline-success"
              className="me-3"
              onClick={openModal}
            >
              Editar curso
            </Button>
            <Button
              variant="outline-success"
              className="me-3"
              onClick={addNewSection}
              disabled={addSection ? true : false}
            >
              Añadir Tema
            </Button>

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

            {addSection && (
              <FormAddSection
                sections={sections}
                addSection={addSection}
                setAddSection={setAddSection}
                course_id={course_id}
              />
            )}

            {sections.map((elem) => {
              return <Card>
              <Card.Body> {elem.section_title} <Button variant="outline-success">Añadir contenido</Button> <Button variant="outline-success" onClick={()=>deleteSection(elem.section_id)}>Eliminar</Button> </Card.Body>
            </Card>
          
            })}
          </Card.Body>
        </Card>

        <EditOneCourse
          showModal={showModal}
          setShowModal={setShowModal}
          setOneCoursePpal={setOneCoursePpal}
          oneCoursePpal={oneCoursePpal}
        />
      </section>
    </>
  );
};
