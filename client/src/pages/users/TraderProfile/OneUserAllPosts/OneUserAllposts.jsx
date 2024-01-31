import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./oneUserAllPosts.scss";

export const OneUserAllPosts = ({
  user_id,
  showPosts,
  setShowPosts,
  traderprofile,
}) => {
  const [tradesposts, setTradesposts] = useState();
  const [generalposts, setgeneralposts] = useState();
  const [show, setShow] = useState(2);
  const navigate = useNavigate();

  // me trae los tradeposts
  useEffect(() => {
    if (user_id) {
      axios
        .get(`http://localhost:3000/users/generalpostsuser/${user_id}`)
        .then((res) => {
          if (res.data.datos[0] === undefined) {
            setTradesposts(null);
          } else {
            setTradesposts(res.data.datos);
          }
        })
        .catch((err) => {
          console.log("AXIOS ERROR", err);
        });
    }
  }, [user_id]);

  // me trae los generalposts
  useEffect(() => {
    if (user_id) {
      axios
        .get(`http://localhost:3000/users/tradespostsuser/${user_id}`)
        .then((res) => {
          if (res.data.datos[0] === undefined) {
            setgeneralposts(null);
          } else {
            setgeneralposts(res.data.datos);
          }
        })
        .catch((err) => {
          console.log("AXIOS ERROR", err);
        });
    }
  }, [user_id]);

  console.log("tradesposts", tradesposts);
  // console.log("generalposts", generalposts);
  // console.log("traders", traderprofile);

  return (
    <>
      <div className="d-flex justify-content-between DivGrisParaBotones w-100 mt-3 mb-3">
        <Button onClick={() => setShow(2)} className="Button2">
          Trades Posts
        </Button>
        <Button onClick={() => setShow(1)} className="Button2">
          General Posts
        </Button>
      </div>
      {show === 1 && (
        <div className="oneuserGeneralPosts">
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {generalposts ? (
              generalposts.map((elem) => {
                return (
                  <Card
                    className="generalpost"
                    style={{ width: "18rem", marginBottom: "1rem" }}
                    key={elem.post_id}
                  >
                    <Row>
                      <Col
                        lg={3}
                        md={12}
                        className="col1 d-flex flex-column align-items-center justify-content-center gap-2 mb-1"
                      >
                        <div className="avatar">
                          {elem?.img_name ? (
                            <img
                              src={`http://localhost:3000/images/users/${traderprofile.user_image}`}
                            />
                          ) : (
                            <p>
                              {traderprofile?.nickname.charAt(0).toUpperCase()}
                            </p>
                          )}
                        </div>
                        <Card.Title className="d-flex">
                          <h3>{traderprofile?.nickname}</h3>
                        </Card.Title>
                        <p>{traderprofile?.followers_count} seguidores</p>
                        <div className="d-flex gap-2">
                          <Button
                            onClick={() => {
                              navigate(`/onegeneralpost/${elem.post_id}`);
                            }}
                          >
                            Ver más
                          </Button>
                        </div>
                      </Col>
                      {elem.resource_text && (
                        <>
                          <Col
                            lg={4}
                            md={12}
                            className="col3 d-flex flex-column align-items-center justify-content-center gap-2 mb-1"
                          >
                            <p>{elem.description}</p>
                          </Col>
                          <Col
                            lg={5}
                            md={12}
                            className="col2 d-flex flex-column align-items-center justify-content-center gap-2 mb-1"
                          >
                            {elem.resource_text !== null && (
                              <Card.Img
                                variant="top"
                                src={`http://localhost:3000/images/generalPost/${elem.resource_text}`}
                              />
                            )}
                          </Col>
                        </>
                      )}
                      {elem.resource_text == null && (
                        <Col
                          lg={9}
                          md={12}
                          className="col3 d-flex flex-column align-items-center justify-content-center gap-2 mb-1"
                        >
                          <p>{elem.description}</p>
                        </Col>
                      )}
                    </Row>
                  </Card>
                );
              })
            ) : (
              <h4 className="alltrades-error-nohaypostsnitrades">
                Este usuario no tiene{" "}
                <span className="alltrades-error-nohaypostsnitrades-hijo">
                  General Posts
                </span>{" "}
                creados.
              </h4>
            )}
          </div>
        </div>
      )}
      {show === 2 && (
        <div className="oneuserTradePosts">
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {tradesposts ? (
              tradesposts.map((elem) => {
                return (
                  <Card
                    className="tradepost"
                    style={{ width: "18rem", marginBottom: "1rem" }}
                    key={elem.post_id}
                  >
                    <Row>
                      <Col
                        lg={3}
                        md={12}
                        className="col1 d-flex flex-column align-items-center justify-content-center gap-2 mb-1"
                      >
                        <div className="avatar">
                          {elem?.img_name ? ( // modificar el elem.im_name
                            <img
                              src={`http://localhost:3000/images/users/${user.img}`}
                            />
                          ) : (
                            <p>
                              {traderprofile?.nickname.charAt(0).toUpperCase()}
                            </p>
                          )}
                        </div>
                        <Card.Title>
                          <h3>{traderprofile.nickname}</h3>
                        </Card.Title>
                        <p>{traderprofile.num_followers} seguidores</p>
                        <div className="d-flex gap-2">
                          <Button
                            onClick={() => {
                              navigate(`/OneTradePost/${elem.post_id}`);
                            }}
                          >
                            Ver más
                          </Button>
                        </div>
                      </Col>

                      {elem.resource_text && (
                        <>
                          <Col
                            lg={4}
                            md={12}
                            className="col3 d-flex flex-column align-items-center justify-content-center gap-2 mb-1"
                          >
                            <p>{elem.currency}</p>
                            <p>{elem.description}</p>
                            <p>
                              Estado:{" "}
                              {elem.correct === null && "Trade Pendiente ❓"}
                              {elem.correct === 0 && "Trade Errado ❌"}
                              {elem.correct === 1 && "Trade Acertado ✅"}
                            </p>
                          </Col>
                          <Col
                            lg={5}
                            md={12}
                            className="col2 d-flex flex-column align-items-center justify-content-center gap-2 mb-1"
                          >
                            {elem.resource_text !== null && (
                              <Card.Img
                                className="tradeimagen"
                                variant="top"
                                src={`http://localhost:3000/images/trades/${elem.resource_text}`}
                              />
                            )}
                            {elem.resource_text == null && (
                              <Card.Img
                                className="tradeimagen"
                                variant="top"
                                src="/images/trade/trades.png"
                              />
                            )}
                          </Col>
                        </>
                      )}
                      {elem.resource_text == null && (
                        <Col
                          lg={9}
                          md={12}
                          className="col3 d-flex flex-column align-items-center justify-content-center gap-2 mb-1"
                        >
                          <p>{elem.currency}</p>
                          <p>{elem.description}</p>
                          <p>
                            Estado:{" "}
                            {elem.correct === null && "Trade Pendiente ❓"}
                            {elem.correct === 0 && "Trade Errado ❌"}
                            {elem.correct === 1 && "Trade Acertado ✅"}
                          </p>
                        </Col>
                      )}
                    </Row>
                  </Card>
                );
              })
            ) : (
              <h4 className="alltrades-error-nohaypostsnitrades">
                Este usuario no tiene{" "}
                <span className="alltrades-error-nohaypostsnitrades-hijo">
                  Trade Posts
                </span>{" "}
                creados.
              </h4>
            )}
          </div>
        </div>
      )}
    </>
  );
};
