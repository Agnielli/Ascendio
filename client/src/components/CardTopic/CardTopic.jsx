import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { ModalResource } from "../ModalResource/ModalResource";
export const CardTopic = ({
  topics,
  setTopics,
  topic,
  deleteTopic,
  section_id,
  setResetCourse,
  resetCourse,
}) => {
  const [showModalArchivo, setShowModalArchivo] = useState(false)
  const handleClick = () => {
    setShowModalArchivo(true)
  }
  //añadir contenido abre un modal con dos opciones input tipo file y tiipo text
  return (
    <Card>
      <Card.Body>
        {topic.topic_title}
        <Button 
        variant="outline-success"
        onClick={handleClick}

        >
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
          />
        )}
      </Card.Body>
    </Card>
  );
};