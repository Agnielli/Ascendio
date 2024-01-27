import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Cardresource = ({ resource, course_id, deleteResource, section_id, topic_id, isIntoValidate, userId, userCourse}) => {

  const navigate = useNavigate();

  const handleClick = () =>{
    let link = ""
   
    if(resource[0].resource_type === 1){
      link = `${resource[0].text}`
    }
    else{
      link = resource[0].text
    }
    navigate(`/resource/${course_id}/${section_id}/${link}/${resource[0].resource_type}`)
  }


  return (
    <div>
      {resource && (resource[0]?.resource_type === 1 || resource[0]?.resource_type === 2) && (
        <>
        <Button 
          onClick={handleClick}
          disabled={isIntoValidate ? true : false}
        >
          {resource[0]?.resource_type === 1 ? "PDF" : null}
          {resource[0]?.resource_type === 2 ? "ENLACE" : null}
        </Button>

        {userId === userCourse &&<Button 
          variant="outline-danger" 
          onClick={()=>deleteResource(section_id, topic_id, resource[0].resource_id)}
          disabled={isIntoValidate ? true : false}
        >Eliminar</Button>}
        </>
      )}   
    </div>
  );
};

