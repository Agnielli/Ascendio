import React, { useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, ListGroup } from "react-bootstrap";

export const UserPosts = () => {
  const [posts, setPosts] = useState();
  const { user } = useContext(AscendioContext);
  const navigate = useNavigate();
  const [markTrade, setMarkTrade] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/users/postsuser/${user.user_id}`)
        .then((res) => {
          setPosts(res.data.datos);
          if (markTrade) {
            setMarkTrade(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, markTrade]);

  const markACorrect = (post_id, correct) => {
    if (posts) {
      axios
        .put(`http://localhost:3000/posts/markatrade/${post_id}`, {
          correct,
          mark: 1,
        })
        .then((res) => {
          console.log(res);
          setMarkTrade(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const markAIncorrect = (post_id, correct) => {
    if (posts) {
      axios
        .put(`http://localhost:3000/posts/markatrade/${post_id}`, {
          correct,
          mark: 0,
        })
        .then((res) => {
          console.log(res);
          setMarkTrade(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const markAPending = (post_id, correct) => {
    if (posts) {
      axios
        .put(`http://localhost:3000/posts/markatrade/${post_id}`, {
          correct,
          mark: null,
        })
        .then((res) => {
          console.log(res);
          setMarkTrade(true);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div className="d-flex p-5 gap-5">
        <h2>Mis Posts</h2>
        <Button onClick={() => navigate("/profile")}>Volver</Button>
      </div>
      <div className="d-flex gap-5 flex-wrap p-5">
        {posts?.map((elem) => {
          return (
            <Card style={{ width: "18rem" }} key={elem.post_id}>
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
                    {elem.correct === null ? (
                      <div className="d-flex gap-1">
                        <Button
                          onClick={() =>
                            markACorrect(elem.post_id, elem.correct)
                          }
                          variant="primary"
                        >
                          Marcar Acertado
                        </Button>
                        <Button
                          onClick={() =>
                            markAIncorrect(elem.post_id, elem.correct)
                          }
                          variant="primary"
                        >
                          Marcar Errado
                        </Button>
                      </div>
                    ) : elem.correct === 1 ? (
                      <div className="d-flex gap-1">
                        <Button
                          onClick={() =>
                            markAIncorrect(elem.post_id, elem.correct)
                          }
                          variant="primary"
                        >
                          Marcar Errado
                        </Button>
                        <Button
                          onClick={() =>
                            markAPending(elem.post_id, elem.correct)
                          }
                          variant="primary"
                        >
                          Marcar Pendiente
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex gap-1">
                        <Button
                          onClick={() =>
                            markACorrect(elem.post_id, elem.correct)
                          }
                          variant="primary"
                        >
                          Marcar Acertado
                        </Button>
                        <Button
                          onClick={() =>
                            markAPending(elem.post_id, elem.correct)
                          }
                          variant="primary"
                        >
                          Marcar Pendiente
                        </Button>
                      </div>
                    )}
                  </ListGroup>
                ) : (
                  <Card.Text>Descripción: {elem.description}</Card.Text>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};
