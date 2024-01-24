import React, { useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { EditOneCourse } from "../../../components/ModalEditOneCourse/EditOneCourse";
import { useNavigate, useParams } from "react-router-dom";
import { FormAddSection } from "../../../components/FormAddSection/FormAddSection";
import { CardSection } from "../../../components/CardSection/CardSection";

export const OneCourse = () => {
  const [oneCoursePpal, setOneCoursePpal] = useState();
  const { user, setUser, userCourse, setUserCourse } =
    useContext(AscendioContext);
  const [showModal, setShowModal] = useState(false);
  const course_id = useParams().course_id;
  const [courseToEdit, setCourseToEdit] = useState();
  const [addSection, setAddSection] = useState(false);
  const [sections, setSections] = useState([]);
  const [topics, setTopics] = useState([]);
  const [resetCourse, setResetCourse] = useState(false);
  const [course, setCourse] = useState();
  const [isIntoWishes, setIsIntoWishes] = useState(false);
  const [courseTags, setCourseTags] = useState([]);
  const [isIntoPurchase, setIsIntoPurchase] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
    setCourseToEdit();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/onecourse/${course_id}`)
      .then((res) => {
        setOneCoursePpal(res.data);
        setCourseToEdit(res.data);
        setSections(res.data.sections);
        setTopics(res.data.topics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showModal, resetCourse]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/getalltagsonecourse/${course_id}`)
      .then((res) => {
        setCourseTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showModal, resetCourse]);

  useEffect(() => {
    axios
    .get(`http://localhost:3000/courses/getalltagsonecourse/${course_id}`)
    .then((res) => {
      setCourseTags(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
  }, [showModal, resetCourse]);

  useEffect(() => {
    if(user){
      axios
      .get(`http://localhost:3000/courses/getwishcourse/${course_id}/${user.user_id}`)
      .then((res) => {
        if(res.data.length){
          setIsIntoWishes(true)
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/courses/getpurchasedcourse/${course_id}/${user?.user_id}`
      )
      .then((res) => {
        if (res.data.length) {
          setIsIntoPurchase(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const formatearFecha = (date) => {
    return date.split("T")[0].split("-").reverse().join("-");
  };

  const addToWishes = () => {
    console.log("aquí se añade wish");
    axios
      .put(`http://localhost:3000/courses/addwishescourse/${course_id}`, {
        usuario: user.user_id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const delFromWishes = () => {
    console.log("aquí se borra wish");
    console.log("userrrr", user);
    axios
      .post(`http://localhost:3000/courses/delfromwishes/${course_id}`, {
        usuario: user.user_id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const addToPurchase = () => {
    console.log("aquí se compra un curso");
    axios
      .put(`http://localhost:3000/courses/addtopurchasecourse/${course_id}`, {
        usuario: user.user_id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleWishes = () => {
    if (isIntoWishes) {
      delFromWishes();
      setIsIntoWishes(false);
    } else {
      addToWishes();
      setIsIntoWishes(true);
    }
  };

  const handlePurchase = () => {
    if (isIntoWishes) {
      setIsIntoPurchase(false);
    } else {
      addToPurchase();
      setIsIntoPurchase(true);
    }
  };

  const addNewSection = () => {
    setAddSection(true);
  };

  const deleteCourse = () => {
    axios
      .put(`http://localhost:3000/courses/deletecourse/${course_id}`)
      .then((res) => {
        navigate(`/oneusercourses/${user.user_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteSection = (section_id) => {
    axios
      .delete(
        `http://localhost:3000/courses/deletesection/${course_id}/${section_id}`
      )
      .then((res) => {
        console.log(res.data);
        setResetCourse(!resetCourse);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //pte comprobar la ruta y hacer el axios.
  const deleteTopic = (section_id, topic_id) => {
    axios
      .delete(
        `http://localhost:3000/courses/deletetopic/${course_id}/${section_id}/${topic_id}`
      )
      .then((res) => {
        console.log(res);
        setResetCourse(!resetCourse);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            <Card.Text>{oneCoursePpal?.price === 0 ? 'GRATIS' : `${oneCoursePpal?.price}€`}</Card.Text>
            <Card.Text>
              {courseTags?.map((e, index) => {
                return e.tag_name + " ";
              })}
            </Card.Text>

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
              Añadir Sección
            </Button>

            <Button onClick={handleWishes}>
              {isIntoWishes ? "Borrar de deseados" : "Añadir a deseados"}
            </Button>

            <Button
              onClick={handlePurchase}
              disabled={isIntoPurchase ? true : false}
            >
              {isIntoPurchase ? "Comprado" : "Comprar"}
            </Button>

            <Button
              onClick={() => deleteCourse(course_id)}
              variant="outline-danger"
              className="me-3"
            >
              Eliminar curso
            </Button>
            {addSection && (
              <FormAddSection
                sections={sections}
                setSections={setSections}
                addSection={addSection}
                setAddSection={setAddSection}
                course_id={course_id}
                setResetCourse={setResetCourse}
                resetCourse={resetCourse}
              />
            )}

            {sections.map((elem) => {
              return (
                <CardSection
                  elem={elem}
                  key={elem.section_id}
                  deleteSection={deleteSection}
                  course_id={course_id}
                  sections={sections}
                  topics={topics}
                  setTopics={setTopics}
                  setResetCourse={setResetCourse}
                  resetCourse={resetCourse}
                  deleteTopic={deleteTopic}
                />
              );
            })}

            <Button variant="outline-warning" className="me-3">
              Validar curso
            </Button>
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
