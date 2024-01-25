import React from 'react'
import { Button, Card } from 'react-bootstrap';

export const CardTopic = (
  {topics,
    setTopics,
    elem,
    deleteTopic,
    section_id,
    setResetCourse,
    resetCourse
  }) => {
  
  return (
    <Card>
      <Card.Body>
         {elem.topic_title}
        <Button 
          variant="outline-success"
        >
          Añadir contenido
        </Button>
        <Button
          variant="outline-success"
          onClick={deleteTopic}

        >
          Eliminar
        </Button>
       

      </Card.Body>
    </Card>
  );
}
