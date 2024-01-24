import axios from "axios";
import React, { useEffect, useState } from "react";
import { CommentCard } from "../Comment/CommentCard";

export const OneComment = () => {
  const [generalPost, setGeneralPost] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/showallusers`)
      .then((res) => {
        console.log(res);
        setUser(res.data);
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
