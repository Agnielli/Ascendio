import axios from "axios";
import React, { useEffect, useState } from "react";

export const ShowAllCommentsPost = ({ showModal, setShowModal, oneTrade }) => {
  const [showComments, setShowComments] = useState();

  const { post_id } = oneTrade;

  if (post_id) {
    useEffect(() => {
      axios
        .get(`http://localhost:3000/comments/showallcomments/${post_id}`)
        .then((res) => {
          console.log(res);
          setShowComments(res.data.result);
        })
        .catch((error) => console.log(error));
    }, []);
  }

  return (
    <div>
      <h3>Comentarios del Post</h3>
      <div>
        {showComments?.map((elem) => {
          return (
            <div key={elem.comment_id} className="d-flex justify-content-center gap-5">
              <h6 className="col-3">{elem.nickname}</h6>
              <p className="col-6">{elem.message}</p>
              <h6 className="col-3">{elem.date.slice(11,16)} / {elem.date.slice(0, 10).split("-").reverse().join("-")}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};
