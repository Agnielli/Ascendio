import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FormAddTopic } from "../FormAddTopic/FormAddTopic";

export const CardSection = ({ elem, deleteSection, course_id, sections }) => {
  const [showTopic, setShowTopic] = useState(false)

  const handleClick = () =>{
    setShowTopic(true)
  }


  //useEffect(effect) que haga una llamada para traerse por cada una de las cards el contenido del topic asociado a cada una de las cards (si lo tuviera). Esa card se va a pintar al lado del botón de delete. 
    return (
    <Card>
      <Card.Body>
        {elem.section_title}
        <Button 
          variant="outline-success"
          onClick={handleClick}
          disabled={showTopic ? true : false}
        >
          Añadir tema
        </Button>
        <Button
          variant="outline-success"
          onClick={() => deleteSection(elem.section_id)}
        >
          Eliminar
        </Button>
        {showTopic &&
          <FormAddTopic 
            setShowTopic = {setShowTopic}
            course_id={course_id}
            sections={sections}
            section_id={elem.section_id}
          />
        }
      </Card.Body>
    </Card>
  );
};
