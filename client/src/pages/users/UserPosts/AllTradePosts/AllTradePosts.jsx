import React, { useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { PendingTradePosts } from "./PendingTradePosts/PendingTradePosts";
import { CorrectTradePosts } from "./CorrectTradePosts/CorrectTradePosts";
import { IncorrectTradePosts } from "./IncorrectTradePosts/IncorrectTradePosts";

export const AllTradePosts = ({
  posts,
  markACorrect,
  markAIncorrect,
  markAPending,
}) => {
  const [showTrades, setShowTrades] = useState(0);

  return (
    <>
      <div className="d-flex pe-5 ps-5 gap-2">
        <Button
          onClick={
            showTrades === 1
              ? () => {
                  setShowTrades(0);
                }
              : () => {
                  setShowTrades(1);
                }
          }
        >
          {showTrades === 1 ? "Ver todos" : "Trades Pendientes"}
        </Button>
        <Button
          onClick={
            showTrades === 2
              ? () => {
                  setShowTrades(0);
                }
              : () => {
                  setShowTrades(2);
                }
          }
        >
          {showTrades === 2 ? "Ver todos" : "Trades Acertados"}
        </Button>
        <Button
          onClick={
            showTrades === 3
              ? () => {
                  setShowTrades(0);
                }
              : () => {
                  setShowTrades(3);
                }
          }
        >
          {showTrades === 3 ? "Ver todos" : "Trades Errados"}
        </Button>
      </div>
      {showTrades === 0 && (
        <div className="d-flex gap-5 flex-wrap pe-5 ps-5">
          {posts
            ?.filter((post) => post.type === 2)
            .map((elem) => {
              return (
                <Card style={{ width: "18rem" }} key={elem.post_id}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:3000/images/trades/${elem.resource_text}`}
                  />
                  <Card.Body>
                    <Card.Title>Categoría: {elem.category_name}</Card.Title>
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
                        Estado: {elem.correct === null && "Trade Pendiente"}
                        {elem.correct === 0 && "Trade Errado"}
                        {elem.correct === 1 && "Trade Acertado"}
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
                  </Card.Body>
                </Card>
              );
            })}
        </div>
      )}
      {showTrades === 1 && (
        <PendingTradePosts
          posts={posts}
          markACorrect={markACorrect}
          markAIncorrect={markAIncorrect}
          markAPending={markAPending}
        />
      )}
      {showTrades === 2 && (
        <CorrectTradePosts
          posts={posts}
          markACorrect={markACorrect}
          markAIncorrect={markAIncorrect}
          markAPending={markAPending}
        />
      )}
      {showTrades === 3 && (
        <IncorrectTradePosts
          posts={posts}
          markACorrect={markACorrect}
          markAIncorrect={markAIncorrect}
          markAPending={markAPending}
        />
      )}
    </>
  );
};
