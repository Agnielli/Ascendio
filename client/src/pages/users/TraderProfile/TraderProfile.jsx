import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { OneUserAllPosts } from "./OneUserAllposts";

export const TraderProfile = () => {
  const [traderprofile, setTraderprofile] = useState();
  const { user_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user_id);
    axios
      .get(`http://localhost:3000/users/traderprofile/${user_id}`)
      .then((res) => {
        console.log(res);
        setTraderprofile(res.data[0]);
        console.log(traderprofile);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="" />
        <Card.Body>
          <Card.Title>{traderprofile?.nickname}</Card.Title>
          <p>Cursos totales:  {traderprofile?.total_courses}</p>
          <p>Posts totales: {traderprofile?.total_posts}</p>
          <p>Posts correctos: {traderprofile?.correct_posts}</p>
          <p>Posts incorrectos: {traderprofile?.incorrect_posts}</p>
          <Button variant="primary" onClick={() => navigate("/showallusers")}>
            Volver
          </Button>
        </Card.Body>
      </Card>
      <div>
      {traderprofile?.user_posts &&
        traderprofile?.user_posts
          .split()
          .map((elem, index) => (
            <OneUserAllPosts key={index} elem={elem} traderprofile={traderprofile}/>
          ))}
        </div>
    </>
  );
};
