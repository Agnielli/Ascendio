import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const OneUserAllPosts = ({ elem, traderprofile }) => {

  const navigate = useNavigate()
  return (
    <div>
      
      <Card style={{ width: "18rem" }}>
        {elem.img ? <Card.Img variant="top" src="holder.js/100px180" /> : null}
        <Card.Body>
          <Card.Text>Por: {elem.nickname}</Card.Text>
          <Card.Text>{elem.description}</Card.Text>
          {elem.type === 2 ? <Button
            onClick={() => {
              
              navigate(`/onetradepost/${elem.post_id}`);
            }}
          >
            Ver más
          </Button> : <Button
            onClick={() => {
              
              navigate(`/allpostsgenerals`);
            }}
          >
            Ver más
          </Button>}
          
          
        </Card.Body>
      </Card>
    </div>
  );
};
