import React from 'react'
import { Button, Card } from 'react-bootstrap';

export const CardTopic = ({topics, setTopics, elem, deleteTopic}) => {
  console.log('OOOOOOOOOOOO', topics)
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

        >
          Eliminar
        </Button>
       

      </Card.Body>
    </Card>
  );
}
