import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const UserFollowing = () => {
  const [following, setFollowing] = useState();

  const { user } = useContext(AscendioContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/users/followingsuser/${user.user_id}`)
        .then((res) => {
          console.log(res);
          setFollowing(res.data.datos);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <>
      <div className="d-flex p-5 gap-5">
        <h2>Siguiendo a:</h2>
        <Button onClick={() => navigate("/profile")}>Volver</Button>
      </div>
      <div className="d-flex gap-5 flex-wrap p-5">
        {following?.map((elem) => {
          return (
            <Card style={{ width: "18rem" }} key={elem.user_id}>
              {elem.img !== null ? (
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/images/users/${elem.img}`}
                />
              ) : (
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/images/users/descarga.png`}
                />
              )}

              <Card.Body>
                <Card.Title>{elem.nickname}</Card.Title>
                <Card.Text></Card.Text>
                <Button variant="primary">Dejar de seguir</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};
