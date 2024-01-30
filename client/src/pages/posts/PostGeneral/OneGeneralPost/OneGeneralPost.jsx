import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ModalCreateComment } from "../../trades/OneTradePost/ModalCreateComment/ModalCreateComment";
import { ShowAllCommentsPost } from "../../trades/OneTradePost/ShowAllCommentsPost/ShowAllCommentsPost";
import "./OneGeneralPost.scss";

export const OneGeneralPost = () => {
  const [oneTrade, setOneTrade] = useState();

  const [showModal, setShowModal] = useState(false);

  const post = useParams();

  // console.log(post);

  const navigate = useNavigate();

  if (post) {
    useEffect(() => {
      axios
        .get(
          `http://localhost:3000/posts/onetradepost/${post.post_id}`
        ) /* cambiar */
        .then((res) => {
          setOneTrade(res.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [post]);
  }
  // console.log(oneTrade);

  return (
    <div className="onegeneralpost">
      {oneTrade && (
        <>
          <div className="p-5">
            <Card className="text-center">
              <Card.Header>
                <h2>Trader: {oneTrade.post_user_nickname}</h2>
              </Card.Header>
              <Card.Header className="row titles">
                {oneTrade.resource_text && (
                  <>
                    <h3 className="col-6">Imagen</h3>
                    <h3 className="col-6">Descripción</h3>
                  </>
                )}
                {oneTrade.resource_text === null && (
                  <>
                    <h3 className="col-12">Descripción</h3>
                  </>
                )}
              </Card.Header>
              <Card.Body>
                <Row>
                  {oneTrade.resource_text && (
                    <>
                      <Col lg={6} md={12} className="mb-2">
                        <Card.Img
                          className="generalpostimagen"
                          src={`http://localhost:3000/images/generalPost/${oneTrade.resource_text}`}
                        />
                      </Col>
                      <Col
                        lg={6}
                        md={12}
                        className="col d-flex align-items-center mb-2"
                      >
                        <h4>{oneTrade.description}</h4>
                      </Col>
                    </>
                  )}
                  {oneTrade.resource_text === null && (
                    <>
                      <Col
                        lg={12}
                        md={12}
                        className="col d-flex align-items-center mb-2"
                      >
                        <h4>{oneTrade.description}</h4>
                      </Col>
                    </>
                  )}
                </Row>

                <Card.Title className="row">
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
                      onClick={() => navigate("/allpostsgenerals")}
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
    </div>
  );
};
