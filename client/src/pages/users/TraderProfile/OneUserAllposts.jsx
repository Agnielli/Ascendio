import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const OneUserAllPosts = ({ elem, traderprofile }) => {
  console.log(traderprofile)

  const navigate = useNavigate()
  return (
    <div>
      <h5 className="m-5">Todos los trades de este usuario:</h5>
      <Card style={{ width: "18rem" }}>
        {traderprofile.img ? <Card.Img variant="top" src="holder.js/100px180" /> : null}
        <Card.Body>
          <Card.Text>Por: {traderprofile.nickname}</Card.Text>
          <Card.Text>{elem}</Card.Text>
          <Button
            onClick={() => {
              navigate(`/onetradepost/${traderprofile.post_id}`);
            }}
          >
            Ver más
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
