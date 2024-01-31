import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AllPosts.scss"
import "../../../../../../client/public/stylesheets/ButtonsApp.scss"


export const AllPosts = ({
  posts,
  markACorrect,
  markAIncorrect,
  markAPending,
}) => {
  const navigate = useNavigate();
  return (
    <div className=" AllPostsScss d-flex flex-wrap">
      {posts?.map((elem) => {
        return (
          <Card className="ESTILOCARD" key={elem.post_id}>
            {elem.resource_text !== null ? (
              <Card.Img
                variant="top"
                src={`http://localhost:3000/images/trades/${elem.resource_text}`}
              />
            ) : <Card.Img
            
            variant="top"
            src={"../../../../../public/images/trade/trades.png"}
          />}
            <Card.Body>
              {/* <Card.Title>Categoría: {elem.category_name}</Card.Title> */}
              {elem.currency !== null ? (
                <ListGroup variant="flush">
                  Detalles:
                  <ListGroup.Item>Categoría: {elem.category_name}</ListGroup.Item>

                  <Card.Text>
                  Descripción: {elem.description}
                  <br/>
                  Currency: {elem.currency}
                  <br/>
                  Precio de entrada: {elem.entry_price}
                  <br/>
                  Precio de stop: {elem.stop_loss}
                  <br/>
                  Precio Profit: {elem.take_profit}
                  <br/>
                  <br/>
                    Estado: {elem.correct === null && "trade pendiente"}
                    {elem.correct === 0 && "trade errado"}
                    {elem.correct === 1 && "trade Acertado"}
                  </Card.Text>
                  
                  <div className="d-flex justify-content-center mt-1 mb-1">
                    <Button
                      onClick={() => {
                        navigate(`/onetradepost/${elem.post_id}`);
                      }}
                    >
                      Ir a comentarios del post
                    </Button>
                  </div>
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
                </ListGroup>
              ) : (
                <div>
                  <Card.Img
                  className="IMGGeneral"
                    variant="top"
                    src={`http://localhost:3000/images/generalPost/${elem.resource_text}`}
                  />
                  <ListGroup.Item><p>Categoría: {elem.category_name}</p></ListGroup.Item>
                  
                    <Card.Text className="d-flex flex-column">
                      <p>Descripción: {elem.description}</p>
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
      })}
    </div>
  );
};
