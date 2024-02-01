import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ModalCreateComment } from "./ModalCreateComment/ModalCreateComment";
import { ShowAllCommentsPost } from "./ShowAllCommentsPost/ShowAllCommentsPost";
import "./oneTradePost.scss";
import "../../../../../public/stylesheets/ESTILOCARDGENERAL.scss";

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
    <>
      {oneTrade && (
        <Row className="onetradepost">
          <Col xxl={3}>
            <Card className="ESTILOCARDGENERAL">
              <Card.Title className="UserCARD">
                <Button
                  className="Button1"
                  onClick={() => navigate("/allpoststrades")}
                  variant="primary"
                >
                  Volver
                </Button>
                {/* <div className="avatarCard">
                  <p className="letteruser">
                    {oneTrade.post_user_nickname.charAt(0).toUpperCase()}
                  </p>
                </div> */}
                <p>{oneTrade.nickname}</p>

                <Link to={`/traderprofile/${oneTrade.user_id}`}>
                  <h2>{oneTrade.post_user_nickname}</h2>
                </Link>
              </Card.Title>
              <div className="DivImagenCard">
                {oneTrade.resource_text !== null ? (
                  <Card.Img
                    variant="top"
                    src={`http://localhost:3000/images/trades/${oneTrade.resource_text}`}
                    className="ascendio-home-card-imagen"
                  />
                ) : (
                  <Card.Img
                    className="CardSinFoto"
                    variant="top"
                    src={"../../../../public/images/iconos/logoascendio.png"}
                  />
                )}
              </div>
              <Card.Body>
                <p>
                  Categoría: <span>{oneTrade.category_name}</span>
                </p>
                <p>
                  Currency: <span>{oneTrade.currency}</span>
                </p>
                <p>
                  Precio de entrada: <span>{oneTrade.entry_price}</span>
                </p>
                <p>
                  Precio de stop: <span>{oneTrade.stop_loss}</span>
                </p>
                <p>
                  Precio Profit: <span>{oneTrade.take_profit}</span>
                </p>
                <p>
                  Descripción: <span>{oneTrade.description}</span>
                </p>
                <h4>
                  {oneTrade.correct === null
                    ? "Trade Pediente ❓"
                    : oneTrade.correct === 1
                    ? "Trade Acertado ✅"
                    : "Trade Errado ❌"}
                </h4>
              </Card.Body>
            </Card>
          </Col>
          <Col xxl={9}>
            <ShowAllCommentsPost
              showModal={showModal}
              setShowModal={setShowModal}
              oneTrade={oneTrade}
            />
          </Col>
          <Col xxl={12}>
            {showModal && (
              <ModalCreateComment
                showModal={showModal}
                setShowModal={setShowModal}
                oneTrade={oneTrade}
              />
            )}
          </Col>{" "}
        </Row>
      )}
    </>
  );
};
