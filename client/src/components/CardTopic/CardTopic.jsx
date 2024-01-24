import React from 'react'
import { Button, Card } from 'react-bootstrap';

export const CardTopic = () => {
  return (
    <Card>
      <Card.Body>
         topic
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
       
        <CardTopic/>
      </Card.Body>
    </Card>
  );
}
