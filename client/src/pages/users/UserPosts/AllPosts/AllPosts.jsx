import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const AllPosts = ({
  posts,
  markACorrect,
  markAIncorrect,
  markAPending,
}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex gap-5 flex-wrap pe-5 ps-5">
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
                        onClick={() => markACorrect(elem.post_id, elem.correct)}
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
                        onClick={() => markAPending(elem.post_id, elem.correct)}
                        variant="primary"
                      >
                        Marcar Pendiente
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="d-flex gap-1 mb-1">
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
                      </div>
                      <div className="d-flex justify-content-center">
                        <Button
                          onClick={() => {
                            navigate(`/onetradepost/${elem.post_id}`);
                          }}
                        >
                          Ir a comentarios del post
                        </Button>
                      </div>
                    </>
                  )}
                </ListGroup>
              ) : (
                <div>
                  <Card.Text className="d-flex flex-column">
                    Descripción: {elem.description}
                  </Card.Text>
                  <Button
                    onClick={() => {
                      navigate(`/onetradepost/${elem.post_id}`);
                    }}
                  >
                    Ir a comentarios del post
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};
