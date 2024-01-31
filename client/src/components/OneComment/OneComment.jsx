import axios from "axios";
import React, { useEffect, useState } from "react";
import { CommentCard } from "../Comment/CommentCard";
import { Col } from "react-bootstrap";

export const OneComment = () => {
  const [generalPost, setGeneralPost] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/getgeneralposts`)
      .then((res) => {
        setGeneralPost(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {generalPost?.map((elem) => {
        return (
          <Col className="d-flex justify-content-center" key={elem.post_id} xl={3} lg={4} sm={6} xs={12}>
            <CommentCard elem={elem} />
          </Col>
        );
      })}
    </>
  );
};
