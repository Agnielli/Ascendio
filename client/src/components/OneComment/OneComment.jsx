import axios from "axios";
import React, { useEffect, useState } from "react";
import { CommentCard } from "../Comment/CommentCard";

export const OneComment = () => {
  const [userComment, setUserComment] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/usercomment`)
      .then((res) => {
        console.log(res);
        setUserComment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
      <div>
        <CommentCard userComment={userComment} setUserComment={setUserComment}/>
      </div>
  )
   
};
