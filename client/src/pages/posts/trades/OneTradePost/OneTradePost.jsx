import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ModalCreateComment } from "./ModalCreateComment/ModalCreateComment";

export const OneTradePost = () => {
  const [oneTrade, setOneTrade] = useState();
  const [showModal, setShowModal] = useState(false);
  const post = useParams();
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
    }, []);
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
              <Card.Header className="row d-flex justify-content-evenly">
                <h3 className="col-2">Categoría: {oneTrade.category_name}</h3>
                <h3 className="col-2">Divisa: {oneTrade.currency}</h3>
              </Card.Header>
              <Card.Body>
                <Card.Title className="row">
                  <div className="col-6">
                    <h4>Precio de entrada: {oneTrade.entry_price}€</h4>
                    <h4>Detener perdida en: {oneTrade.stop_loss}€</h4>
                    <h4>Coger Ganancias en: {oneTrade.take_profit}€</h4>
                  </div>
                  <div className="col-6">
                    <h4>{oneTrade.description}</h4>
                  </div>
                </Card.Title>
              </Card.Body>
              <Card.Footer className="text-muted">
                <h4>
                  {oneTrade.correct === 0
                    ? "Trade Pediente"
                    : oneTrade.correct === 1
                    ? "Trade Acertado"
                    : "Trade"}
                </h4>
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
