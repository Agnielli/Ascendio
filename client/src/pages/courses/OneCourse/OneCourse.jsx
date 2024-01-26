import React, { useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { EditOneCourse } from "../../../components/ModalEditOneCourse/EditOneCourse";
import { useNavigate, useParams } from "react-router-dom";
import { FormAddSection } from "../../../components/FormAddSection/FormAddSection";
import { CardSection } from "../../../components/CardSection/CardSection";
import { ModalDelOneCourse } from "../../../components/ModalDelOneCourse/ModalDelOneCourse";
import { CardRatingsOneCourse } from "../../../components/Courses/CardRatingsOneCourse/CardRatingsoneCourse";
import { ratesAverage } from "../../../helpers/utils";

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
  const [isIntoWishes, setIsIntoWishes] = useState(false);
  const [isIntoPurchase, setIsIntoPurchase] = useState(false)
  const [isIntoValidate, setIsIntoValidate] = useState(false)
  const [courseTags, setCourseTags] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [creator, setCreator] = useState()
  const [orderedSections, setOrderedSections] = useState([]);
  const [rates, setRates] = useState([])
  const [ratingAverage, setRatingAverage] = useState()
  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
    setCourseToEdit();
  };

  const openModalDelete = () => {
    setShowModalDelete(true);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/onecourse/${course_id}`)
      .then((res) => {
        console.log("ppppppppppppp", res.data);
        setOneCoursePpal(res.data);
        setCourseToEdit(res.data);
        setSections(res.data.sections);
        setTopics(res.data.topics);
        if(res.data.is_completed === 1){
          setIsIntoValidate(true)
        }
        setUserCourse(res.data.user_id)
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
    .get(`http://localhost:3000/courses/getcreatoruser/${course_id}`)
    .then((res) => {
      setCreator(res.data[0])
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

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
    if(user){
    axios
      .get(
        `http://localhost:3000/courses/getpurchasedcourse/${course_id}/${user.user_id}`
      )
      .then((res) => {
        if (res.data.length) {
          setIsIntoPurchase(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [user]);

  useEffect(() => {
    // Ordenar las secciones por algún criterio (puedes ajustar según tus necesidades)
    const sortedSections = sections.slice().sort((a, b) => {
      // Reemplaza esta lógica con tu criterio de ordenación
      // Ejemplo: ordenar por fecha de creación
      return new Date(a.created_at) - new Date(b.created_at);
    });
    
    // Asignar índices a las secciones ordenadas
    const sectionsWithIndex = sortedSections.map((section, index) => ({ ...section, index: index + 1 }));
    
    // Actualizar el estado
    setOrderedSections(sectionsWithIndex);
  }, [sections, resetCourse, addSection])

  useEffect(() => {
      axios
      .get(`http://localhost:3000/courses/getallratesonecourse/${course_id}`)
      .then((res) => {
        if(res.data.length){
          setRates(res.data)
          ratesAverage(res.data)
          setRatingAverage(ratesAverage(res.data))
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, []);


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
    axios
      .post(`http://localhost:3000/courses/delfromwishes/${course_id}`, {
        usuario: user.user_id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const addToPurchase = () => {
    axios
      .put(`http://localhost:3000/courses/addtopurchasecourse/${course_id}`, {
        usuario: user.user_id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const addToValidate = () => {
    axios
      .put(`http://localhost:3000/courses/addtovalidatecourse/${course_id}`)
      .then((res) => {
        setIsIntoValidate(true)
      })
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
  
  const handleValidate = () => {
    if (isIntoValidate) {
      setIsIntoValidate(false);
    } else {
      addToValidate();
      setIsIntoValidate(true);
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
  let userId = user.user_id;

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
              Autor del curso {creator?.nickname}
            </Card.Subtitle>
            <Card.Subtitle>
              {oneCoursePpal && "Creado: " + formatearFecha(oneCoursePpal.date)}
            </Card.Subtitle>
            <Card.Text>{oneCoursePpal?.description}</Card.Text>
            <Card.Text>{oneCoursePpal?.price === 0 ? 'GRATIS' : `${oneCoursePpal?.price}€`}</Card.Text>
            <Card.Text>
              {courseTags?.map((e, index) => {
                return e.tag_name + " ";
              })}
            </Card.Text>

            {userId === userCourse &&<Button
              variant="outline-success"
              className="me-3"
              onClick={openModal}
            >
              Editar curso
            </Button>}
            {userId === userCourse &&<Button
              variant="outline-success"
              className="me-3"
              onClick={addNewSection}
              disabled={addSection ? true : false}
            >
              Añadir Sección
            </Button>}

            <Button onClick={handleWishes}>
              {isIntoWishes ? "Borrar de deseados" : "Añadir a deseados"}
            </Button>

            {userId !== userCourse &&<Button
              onClick={handlePurchase}
              disabled={isIntoPurchase ? true : false}
            >
              {isIntoPurchase ? "Comprado" : "Comprar"}

            </Button>}

            {user.user_id === userCourse &&<Button
              // onClick={() => deleteCourse(course_id)}

              onClick={openModalDelete}
              variant="outline-danger"
              className="me-3"
            >
              Eliminar curso
            </Button>}

            
            {addSection &&(
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

            {orderedSections.map((elem, index) => {
              return (
                <CardSection
                  userId={userId}
                  userCourse={userCourse} 
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
                  index={index + 1}
                />
              );
            })}

            {userId === userCourse &&<Button
              variant="outline-warning" 
              onClick={handleValidate}
              disabled={isIntoValidate ? true : false}
            >
              {isIntoValidate ? "Enviado al administrador" : "Validar curso"}
            </Button>}
          </Card.Body>
        </Card>

        <EditOneCourse
          showModal={showModal}
          setShowModal={setShowModal}
          setOneCoursePpal={setOneCoursePpal}
          oneCoursePpal={oneCoursePpal}
        />

        <ModalDelOneCourse
            showModalDelete={showModalDelete}
            setShowModalDelete={setShowModalDelete}
            deleteCourse={deleteCourse}
            course_id={course_id}
        />

        <h5>¿Qué opina la gente?</h5>
              
          <div className="d-flex flex-column">
            {rates?.map((elem)=>(
            <CardRatingsOneCourse
            key={elem.user_rater_user_id}
            rates={elem}
            />
           ))}
            
          </div>           

              <h1> MEDIA DE LAS VALORACIONES {ratingAverage}</h1>
      </section>
    </>
  );
};
