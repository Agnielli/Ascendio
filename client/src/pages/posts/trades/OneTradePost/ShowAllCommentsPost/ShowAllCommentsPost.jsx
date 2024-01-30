import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AscendioContext } from "../../../../../context/AscendioContext";
import './ShowAllCommentsPost.scss';

export const ShowAllCommentsPost = ({ showModal, setShowModal, oneTrade }) => {
  const [showComments, setShowComments] = useState();
  const [update, setUpade] = useState(false);

  const { post_id } = oneTrade;

  const { user } = useContext(AscendioContext);

  if (post_id) {
    useEffect(() => {
      axios
        .get(`http://localhost:3000/comments/showallcomments/${post_id}`)
        .then((res) => {
          console.log(res);
          setShowComments(res.data.result);
          setUpade(false);
        })
        .catch((error) => console.log(error));
    }, [update]);
  }

  const deleteComment = (comment_id) => {
    axios
      .put(`http://localhost:3000/comments/deletecomments/${comment_id}`)
      .then((res) => {
        console.log(res);
        setUpade(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(showComments);

  return (
    <div className="comments">
      <h3>Comentarios del Post</h3>
      <hr />
      {showComments?.map((elem) => {
        return (
          <Row key={elem.comment_id} className="d-flex justify-content-center align-items-center gap-1 mb-4">
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
    </div>
  );
};
