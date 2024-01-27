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
  course_id,
  deleteResource,
  userId,
  userCourse,
  isIntoValidate
}) => {

  const [showModalArchivo, setShowModalArchivo] = useState(false);
  const [resource, setResource] = useState();

  const handleClick = () => {
    setShowModalArchivo(true);
  };
  
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/courses/getoneresource/${course_id}/${section_id}/${topic.topic_id}`
      )
      .then((res) => {
        setResource(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [course_id, section_id, topic.topic_id, resetCourse]);

  return (
    <Card>
      <Card.Body>
        {`${index}. ${topic.topic_title}`}
        
        {resource?.length === 0 && userId === userCourse &&
        <Button variant="outline-success" onClick={handleClick}
        disabled={isIntoValidate ? true : false}
        >
        Añadir contenido
      </Button>}

          {userId === userCourse &&<Button
          variant="outline-danger"
          onClick={() => deleteTopic(section_id, topic.topic_id)}
          disabled={isIntoValidate ? true : false}
        >
          Eliminar
        </Button>}

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

        {topic &&
        <Cardresource
        resource={resource}
        course_id={course_id}
        deleteResource={deleteResource} 
        isIntoValidate={isIntoValidate}
        userId={userId}
        userCourse={userCourse}
        section_id={section_id} 
        topic_id={topic.topic_id}
        />}
      </Card.Body>
    </Card>
  );
};
