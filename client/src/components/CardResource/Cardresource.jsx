import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Cardresource = ({ resource, course_id }) => {

  const navigate = useNavigate()
  console.log();
  const handleClick = () =>{
    let link = ""
    //comprobar el if - let data = resource[0] luego pintar data en todos lados
    if(resource[0].resource_type === 1){
      link = `http://localhost:3000/images/resource/${resource[0].text}`
    }
    else{
      link = resource[0].text
    }
    navigate(`/resource/${course_id}/${link}`)
  }

  return (
    <div>
      {resource && (
        <Button onClick={handleClick}>
          {resource[0]?.resource_type === 1 ? "PDF" : "ENLACE"}
        </Button>
      )}
    </div>
  );
};
