import React from "react";
import './CommentCard.scss'

export const CommentCard = ({ elem }) => {
  return (
    <div className="CommentDiv">
      <h6 className="mb-3">{elem.nickname}</h6>
      <p>{elem.description}</p>
      <p></p>
    </div>
  );
};
