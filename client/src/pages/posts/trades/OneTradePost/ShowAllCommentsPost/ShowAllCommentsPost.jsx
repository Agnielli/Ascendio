import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AscendioContext } from "../../../../../context/AscendioContext";

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
    <div>
      <h3>Comentarios del Post</h3>
      <hr />
      {showComments?.map((elem) => {
        return (
          <div key={elem.comment_id} className="d-flex gap-5 mb-1">
            <h6 className="col-1">{elem.nickname}</h6>
            <p className="col-7">{elem.message}</p>
            <h6 className="col-2">
              {elem.date.slice(11, 16)} /{" "}
              {elem.date.slice(0, 10).split("-").reverse().join("-")}
            </h6>
            {user.user_id === elem.user_id && (
              <Button
                className="col-1"
                onClick={() => {
                  deleteComment(elem.comment_id);
                }}
              >
                Eliminar
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};
