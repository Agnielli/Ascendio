import React from "react";
import { Button, Card } from "react-bootstrap";

export const CardTopic = ({
  topics,
  setTopics,
  topic,
  deleteTopic,
  section_id,
  setResetCourse,
  resetCourse,
}) => {

  //añadir contenido abre un modal con dos opciones input tipo file y tiipo text
  //href atributo download para descargar
  //bradcrumbs para cuando entramos en cada topic
  


  return (
    <Card>
      <Card.Body>
        {topic.topic_title}
        <Button variant="outline-success">Añadir contenido</Button>
        <Button
          variant="outline-success"
          onClick={() => deleteTopic(section_id, topic.topic_id)}
        >
          Eliminar
        </Button>
      </Card.Body>
    </Card>
  );
};
