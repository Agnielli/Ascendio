import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ModalCreateComment } from "../../trades/OneTradePost/ModalCreateComment/ModalCreateComment";
import { ShowAllCommentsPost } from "../../trades/OneTradePost/ShowAllCommentsPost/ShowAllCommentsPost";


export const OneGeneralPost = () => {
  const [oneTrade, setOneTrade] = useState();

  const [showModal, setShowModal] = useState(false);

  const post = useParams();

  console.log(post);

  const navigate = useNavigate();

  if (post) {
    useEffect(() => {
      axios
        .get(`http://localhost:3000/posts/onetradepost/${post.post_id}`) /* cambiar */
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
                <div className="col-6">
                  <h3>Imagen</h3>
                </div>
                <div className="col-6">
                  <h3>Descripción</h3>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Title className="row">
                  <div className="col-6">
                    <img src={`http://localhost:3000/images/generalPost/${oneTrade.resource_text}`} alt="imagen" />
                  </div>
                  <div className="col-6">
                    <h4>{oneTrade.description}</h4>
                  </div>
                  </Card.Title>
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
  )
}
