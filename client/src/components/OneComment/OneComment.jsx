import axios from "axios";
import React, { useEffect, useState } from "react";
import { CommentCard } from "../Comment/CommentCard";

export const OneComment = () => {
  const [generalPost, setGeneralPost] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/getgeneralposts`)
      .then((res) => {
        setGeneralPost(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {generalPost?.map((elem) => {
        return <CommentCard key={elem.post_id} elem={elem} />;
      })}
    </div>
  );
};


