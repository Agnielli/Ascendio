import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ModalCreateComment } from "./ModalCreateComment/ModalCreateComment";
import { ShowAllCommentsPost } from "./ShowAllCommentsPost/ShowAllCommentsPost";
import "./oneTradePost.scss";

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
          console.log(res);
          setOneTrade(res.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [post]);
  }
  console.log(oneTrade);

  return (
    <div className="onetradepost">
      {oneTrade && (
        <>
          <div className="p-5">
            <Card className="text-center">
              <Card.Header>
                <h2>Trader: {oneTrade.post_user_nickname}</h2>
              </Card.Header>
              <Card.Header className="row">
                {oneTrade.resource_text &&
                <>
                  <h3 className="col-xl-4 hide-on-small-screen"></h3>
                  <h3 className="col-xl-4 col-lg-12">Categoría: {oneTrade.category_name}</h3>
                  <h3 className="col-xl-4 col-lg-12">Divisa: {oneTrade.currency}</h3> 
                </>
                }
                {oneTrade.resource_text === null && 
                  <>
                    <h3 className="col-xl-6 col-lg-12">Categoría: {oneTrade.category_name}</h3>
                    <h3 className="col-xl-6 col-lg-12">Divisa: {oneTrade.currency}</h3> 
                  </>
                }
              </Card.Header>
              <Card.Body>
                <Row>
                  {oneTrade.resource_text && (
                    <>
                      <Col
                        lg={4}
                        md={12}
                        className="col1 d-flex justify-content-center mb-2"
                      >
                        <Card.Img
                          className="tradeimagen"
                          src={`http://localhost:3000/images/trades/${oneTrade.resource_text}`}
                        />
                      </Col>
                      <Col
                        lg={4}
                        md={12}
                        className="col2 category d-flex flex-column gap-3 mb-2"
                      >
                        <div>
                          <h4>Precio de entrada: {oneTrade.entry_price}€</h4>
                          <h4>Detener perdida en: {oneTrade.stop_loss}€</h4>
                          <h4>Coger Ganancias en: {oneTrade.take_profit}€</h4>
                        </div>
                        <h4>
                          {oneTrade.correct === null
                            ? "Trade Pediente ❓"
                            : oneTrade.correct === 1
                            ? "Trade Acertado ✅"
                            : "Trade Errado ❌"}
                        </h4>
                      </Col>
                      <Col lg={4} md={12} className="col3 description mb-2">
                        <h4>{oneTrade.description}</h4>
                      </Col>
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
                    </>
                  )}
                  {oneTrade.resource_text === null && (
                    <>
                      <Col
                        lg={6}
                        md={12}
                        className="col2 category d-flex flex-column gap-3 mb-2"
                      >
                        <div>
                          <h4>Precio de entrada: {oneTrade.entry_price}€</h4>
                          <h4>Detener perdida en: {oneTrade.stop_loss}€</h4>
                          <h4>Coger Ganancias en: {oneTrade.take_profit}€</h4>
                        </div>
                        <h4>
                          {oneTrade.correct === null
                            ? "Trade Pediente ❓"
                            : oneTrade.correct === 1
                            ? "Trade Acertado ✅"
                            : "Trade Errado ❌"}
                        </h4>
                      </Col>
                      <Col lg={6} md={12} className="col3 description mb-2">
                        <h4>{oneTrade.description}</h4>
                      </Col>
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
                    </>
                  )}
                </Row>
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
    </div>
  );
};
