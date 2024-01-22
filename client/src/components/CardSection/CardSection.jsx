import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";

export const CardSection = ({ elem }) => {
  //useEffect(effect) que haga una llamada para traerse por cada una de las cards el contenido del topic asociado a cada una de las cards (si lo tuviera). Esa card se va a pintar al lado del botón de delete. 
    return (
    <Card>
      <Card.Body>
        
        {elem.section_title}
        <Button variant="outline-success">Añadir contenido</Button>
        <Button
          variant="outline-success"
          onClick={() => deleteSection(elem.section_id)}
        >
          Eliminar
        </Button>
        
      </Card.Body>
    </Card>
  );
};
