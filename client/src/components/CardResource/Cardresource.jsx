import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Cardresource = ({ resource, course_id, deleteResource, section_id, topic_id}) => {
  const navigate = useNavigate();
  console.log('KKKKKKKKKK', resource);
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

    /* let resource_id = resource[0].resource_id;

    const handleDeleteClick = () => {
      deleteResource(section_id, topic_id, resource_id)
    } */

  return (
    <div>
      {resource && (resource[0]?.resource_type === 1 || resource[0]?.resource_type === 2) && (
        <>
        <Button onClick={handleClick}>
          {resource[0]?.resource_type === 1 ? "PDF" : null}
          {resource[0]?.resource_type === 2 ? "ENLACE" : null}
        </Button>
        {/* <Button variant="outline-danger" onClick={handleDeleteClick} >Eliminar</Button> */}
        <Button variant="outline-danger" onClick={deleteResource(section_id, topic_id, resource.resource_id)} >Eliminar</Button>
        </>
      
      )}
      
      
    </div>
  );
};
