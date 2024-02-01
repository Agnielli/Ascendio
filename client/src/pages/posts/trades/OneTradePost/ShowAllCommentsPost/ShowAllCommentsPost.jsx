import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AscendioContext } from "../../../../../context/AscendioContext";
import "./ShowAllCommentsPost.scss";

export const ShowAllCommentsPost = ({ showModal, setShowModal, oneTrade }) => {
  const [showComments, setShowComments] = useState();
  const [update, setUpade] = useState(false);

  const { post_id } = oneTrade;

  const { user } = useContext(AscendioContext);

  useEffect(() => {
    if (post_id) {
      axios
        .get(`http://localhost:3000/comments/showallcomments/${post_id}`)
        .then((res) => {
          console.log(res);
          setShowComments(res.data.result);
          setUpade(false);
        })
        .catch((error) => console.log(error));
    }
  }, [update, showModal]);

  const deleteComment = (comment_id) => {
    axios
      .put(`http://localhost:3000/comments/deletecomments/${comment_id}`)
      .then((res) => {
        setUpade(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(new Date());

  return (
    <>
      <Row className="showallcommentsposts-padre">
        <Col xxl={12} className="d-flex gap-5">
          <h3>Comentarios del Post</h3>
        </Col>
        <Col xxl={12} className="showallcommentsposts-hijo">
          {showComments?.map((elem) => {
            return (
              <Row key={elem.comment_id} className="showallcommentsposts-nieto">
                <Col lg={1} xs={12} className="col">
                  <h6>{elem.nickname}</h6>
                </Col>
                <Col lg={7} xs={12} className="col">
                  <p>{elem.message}</p>
                </Col>
                <Col lg={2} xs={12} className="col">
                  <h6>
                    {elem.date.slice(11, 16)} /{" "}
                    {elem.date.slice(0, 10).split("-").reverse().join("-")}
                  </h6>
                </Col>
                <Col lg={1} xs={12} className="col text-center">
                  {user.user_id === elem.user_id && (
                    <Button
                      className="Button1"
                      onClick={() => {
                        deleteComment(elem.comment_id);
                      }}
                    >
                      Eliminar
                    </Button>
                  )}
                </Col>
              </Row>
            );
          })}
        </Col>
        <Col xxl={12}>
          <Button
            className="Button1"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Comentar
          </Button>
        </Col>
      </Row>
    </>
  );
};
