import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { ModalResource } from "../ModalResource/ModalResource";
import { Cardresource } from "../CardResource/Cardresource";
import axios from "axios";

export const CardTopic = ({
  topic,
  deleteTopic,
  section_id,
  setResetCourse,
  resetCourse,
  index,
  course_id
}) => {
  //href atributo download para descargar
  //bradcrumbs para cuando entramos en cada topic

  const [showModalArchivo, setShowModalArchivo] = useState(false);
  const [resource, setResource] = useState()

  const handleClick = () => {
    setShowModalArchivo(true);
  };
  
  useEffect(()=>{

    axios
      .get(`http://localhost:3000/courses/getoneresource/${course_id}/${section_id}/${topic.topic_id}`)
      .then((res)=>{
        setResource(res.data)
      })
      .catch((err)=>{
        console.log(err);
      })
  }, [])


  return (
    <Card>
      <Card.Body>
        {`${index}. ${topic.topic_title}`}
        <Button variant="outline-success" onClick={handleClick}>
          Añadir contenido
        </Button>

        <Button
          variant="outline-success"
          onClick={() => deleteTopic(section_id, topic.topic_id)}
        >
          Eliminar
        </Button>

        {showModalArchivo && (
          <ModalResource
            showModalArchivo={showModalArchivo}
            setShowModalArchivo={setShowModalArchivo}
            setResetCourse={setResetCourse}
            resetCourse={resetCourse}
            section_id={section_id}
            topic_id={topic.topic_id}
          />
        )}

        {
          topic &&
          <Cardresource
          resource={resource}
          course_id={course_id}
         />
        }
        
      </Card.Body>
    </Card>
  );
};
