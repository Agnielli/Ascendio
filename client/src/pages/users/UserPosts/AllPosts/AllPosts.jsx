import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AllPosts.scss";
import "../../../../../../client/public/stylesheets/ButtonsApp.scss";

export const AllPosts = ({
  posts,
  markACorrect,
  markAIncorrect,
  markAPending,
}) => {
  const navigate = useNavigate();
  return (
    <Row className=" AllPostsScss d-flex flex-wrap">
      <Col>
        {posts?.map((elem) => {
          return (
            <Card key={elem.post_id}>
              {elem.resource_text === null ? (
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/images/trades/LOQUESEA`}
                />
              ) : (
                <Card.Img
                  variant="top"
                  src={
                    elem.type === 2
                      ? `http://localhost:3000/images/trades/${elem.resource_text}`
                      : `http://localhost:3000/images/generalpost/${elem.resource_text}`
                  }
                />
              )}
              {elem.type === 2 ? (
                <Card.Body>
                  <Card.Title> {elem.category_name} </Card.Title>
                  <Card.Text>
                    {elem.currency !== null ? (
                      <p>Currency: {elem.currency}</p>
                    ) : null}
                    <p>Descripción: {elem.description}</p>
                    <p>Precio de entrada: {elem.entry_price}</p>
                    <p>Precio de stop: {elem.stop_loss}</p>
                    <p>Precio Profit: {elem.take_profit}</p>
                    <p>
                      Estado: {elem.correct === null && "trade pendiente"}
                      {elem.correct === 0 && "trade errado"}
                      {elem.correct === 1 && "trade Acertado"}
                    </p>
                  </Card.Text>
                  <div className="d-flex justify-content-center mt-1 mb-1">
                    <Button
                      onClick={() => {
                        navigate(`/onetradepost/${elem.post_id}`);
                      }}
                    >
                      Ir a comentarios del post
                    </Button>
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
                      <>
                        <div>
                          <div className="d-flex gap-1 mb-1">
                            <Button
                              className="Button2"
                              onClick={() =>
                                markACorrect(elem.post_id, elem.correct)
                              }
                              variant="primary"
                            >
                              Marcar Acertado
                            </Button>
                            <Button
                              className="Button2"
                              onClick={() =>
                                markAPending(elem.post_id, elem.correct)
                              }
                              variant="primary"
                            >
                              Marcar Pendiente
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Card.Body>
              ) : (
                <Card.Body>
                  <Card.Title> {elem.category_name} </Card.Title>
                  <Card.Text>
                    {elem.currency !== null ? (
                      <p>Currency: {elem.currency}</p>
                    ) : null}
                    <p>Descripción: {elem.description}</p>
                  </Card.Text>
                  <Button
                    onClick={() => {
                      navigate(`/onegeneralpost/${elem.post_id}`);
                    }}
                  >
                    Ir a comentarios del post
                  </Button>
                </Card.Body>
              )}
            </Card>
          );
        })}
      </Col>
    </Row>
  );
};
