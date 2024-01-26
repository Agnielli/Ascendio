import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const OneUserAllPosts = ({ user_id, showPosts, setShowPosts }) => {
  const [posts, setPosts] = useState();
  const navigate = useNavigate();

  user_id &&
    useEffect(() => {
      axios
        .get(`http://localhost:3000/users/postsuser/${user_id}`)
        .then((res) => {
          console.log(res.data.datos[0]);
          if (res.data.datos[0] === undefined) {
            setPosts(null);
          } else {
            setPosts(res.data.datos);
          }
        })
        .catch((err) => {
          console.log("AXIOS ERROR", err);
        });
    }, [user_id]);

  return (
    <div className="d-flex gap-5 flex-wrap pe-5 ps-5">
      {posts ? (
        posts.map((elem) => {
          return (
            <Card className="mt-2" style={{ width: "18rem" }} key={elem.post_id}>
              {elem.resource_text !== null ? (
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/images/trades/${elem.resource_text}`}
                />
              ) : null}
              <Card.Body>
                <Card.Title>Categoría: {elem.category_name}</Card.Title>
                {elem.currency !== null ? (
                  <ListGroup variant="flush">
                    Detalles:
                    <ListGroup.Item>Currency: {elem.currency}</ListGroup.Item>
                    <ListGroup.Item>
                      Precio de entrada: {elem.entry_price}€
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Precio de stop: {elem.stop_loss}€
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Precio Profit: {elem.take_profit}€
                    </ListGroup.Item>
                    <ListGroup.Item className="mb-1">
                      Descripción: {elem.description}
                    </ListGroup.Item>
                    <ListGroup.Item className="mb-1">
                      Estado: {elem.correct === null && "trade pendiente"}
                      {elem.correct === 0 && "trade errado"}
                      {elem.correct === 1 && "trade Acertado"}
                    </ListGroup.Item>{" "}
                    <div className="d-flex justify-content-center mt-1 mb-1">
                      <Button
                        onClick={() => {
                          navigate(`/onetradepost/${elem.post_id}`);
                        }}
                      >
                        Ir a comentarios del post
                      </Button>
                    </div>
                  </ListGroup>
                ) : (
                  <div>
                    <Card.Img
                      variant="top"
                      src={`http://localhost:3000/images/generalPost/${elem.resource_text}`}
                    />
                    <Card.Text className="d-flex flex-column">
                      Descripción: {elem.description}
                    </Card.Text>
                    <Button
                      onClick={() => {
                        navigate(`/oneGeneralPost/${elem.post_id}`);
                      }}
                    >
                      Ir a comentarios del post
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <h2 className="mt-5">Este usuario no tiene Posts</h2>
      )}
    </div>
  );
};
