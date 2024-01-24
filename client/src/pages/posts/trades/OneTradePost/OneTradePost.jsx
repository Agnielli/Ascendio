import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ModalCreateComment } from "./ModalCreateComment/ModalCreateComment";
import { ShowAllCommentsPost } from "./ShowAllCommentsPost/ShowAllCommentsPost";

export const OneTradePost = () => {
  const [oneTrade, setOneTrade] = useState();

  const [showModal, setShowModal] = useState(false);

  const post = useParams();

  console.log(post);

  const navigate = useNavigate();

  if (post) {
    useEffect(() => {
      axios
        .get(`http://localhost:3000/posts/onetradepost/${post.post_id}`)
        .then((res) => {
          setOneTrade(res.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [post]);
  }
  console.log(oneTrade);

  return (
    <>
      {oneTrade && (
        <>
          <div className="p-5">
            <Card className="text-center">
              <Card.Header>
                <h2>Trader: {oneTrade.post_user_nickname}</h2>
              </Card.Header>
              <Card.Header className="row d-flex">
                <h3 className="col-4">Imagen {oneTrade.category_name}</h3>
                <h3 className="col-4">Categoría: {oneTrade.category_name}</h3>
                <h3 className="col-4">Divisa: {oneTrade.currency}</h3>
              </Card.Header>
              <Card.Body>
                <Card.Title className="row">
                  <div className="col-4">
                    <img src={`http://localhost:3000/images/trades/${oneTrade.resource_text}`} alt="imagen" />
                  </div>
                  <div className="col-4">
                    <h4>Precio de entrada: {oneTrade.entry_price}€</h4>
                    <h4>Detener perdida en: {oneTrade.stop_loss}€</h4>
                    <h4>Coger Ganancias en: {oneTrade.take_profit}€</h4>
                  </div>
                  <div className="col-4">
                    <h4>{oneTrade.description}</h4>
                  </div>
                  <h4>
                    {oneTrade.correct === 0
                      ? "Trade Pediente"
                      : oneTrade.correct === 1
                      ? "Trade Acertado"
                      : "Trade"}
                  </h4>
                  <div className="d-flex gap-1 justify-content-center">
                    <Button
                      onClick={() => {
                        setShowModal(true);
                      }}
                      variant="primary"
                    >
                      Comentar
                    </Button>
                    <Button
                      onClick={() => navigate("/allpoststrades")}
                      variant="primary"
                    >
                      Volver
                    </Button>
                  </div>
                </Card.Title>
              </Card.Body>
              <Card.Footer className="text-muted">
                {!showModal && (
                  <ShowAllCommentsPost
                    showModal={showModal}
                    setShowModal={setShowModal}
                    oneTrade={oneTrade}
                  />
                )}
              </Card.Footer>
            </Card>
          </div>
          {showModal && (
            <ModalCreateComment
              showModal={showModal}
              setShowModal={setShowModal}
              oneTrade={oneTrade}
            />
          )}
        </>
      )}
    </>
  );
};
