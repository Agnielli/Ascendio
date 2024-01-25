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
  index
}) => {

  //añadir contenido abre un modal con dos opciones input tipo file y tiipo text
  //href atributo download para descargar
  //bradcrumbs para cuando entramos en cada topic

  const [showModalArchivo, setShowModalArchivo] = useState(false)
  const handleClick = () => {
    setShowModalArchivo(true)
  }

  return (
    <Card>
      <Card.Body>
      {`${index}. ${topic.topic_title}`}
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

