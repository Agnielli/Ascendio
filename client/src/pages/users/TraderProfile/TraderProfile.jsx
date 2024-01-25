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
        setTraderprofile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h5>Todos los trades de este usuario</h5>

      {traderprofile?.map((elem, index) => {
        return <OneUserAllPosts key={index} elem={elem} />;
      })}
      <div>
        <Button
          className="mt-5"
          variant="primary"
          onClick={() => navigate("/showallusers")}
        >
          Volver
        </Button>
      </div>
    </>
  );
};
