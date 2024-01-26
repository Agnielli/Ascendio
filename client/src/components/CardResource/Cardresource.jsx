import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Cardresource = ({ resource, course_id, deleteResource}) => {
  const navigate = useNavigate();

  const handleClick = () =>{
    let link = ""
    //comprobar el if - let data = resource[0] luego pintar data en todos lados
    if(resource[0].resource_type === 1){
      link = `${resource[0].text}`
    }
    else{
      link = resource[0].text
    }
    navigate(`/resource/${course_id}/${link}`)
  }

  return (
    <div>
      {resource && (resource[0]?.resource_type === 1 || resource[0]?.resource_type === 2) && (
        <>
        <Button onClick={handleClick}>
          {resource[0]?.resource_type === 1 ? "PDF" : null}
          {resource[0]?.resource_type === 2 ? "ENLACE" : null}
        </Button>
        <Button variant="outline-danger" >Eliminar</Button>
        </>
//onClick={deleteResource(resource.section_id, resource.topic_id, resource.resource_id)}
        
      )}
    </div>
  );
};
