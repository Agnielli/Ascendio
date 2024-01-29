import React, { useEffect, useState } from "react";
import "./UserMiniCard.scss";
import { Button, Container } from "react-bootstrap";
import axios from "axios";

export const UserMiniCard = ({ elem, updateUsers, setUpdateUsers }) => {
  const activateUser = (id, is_disabled) => {
    let url = `http://localhost:3000/admin/activateuser/${id}`;
    if (is_disabled === 0) {
      url = `http://localhost:3000/admin/disableuser/${id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setUpdateUsers(!updateUsers);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="userMiniCardAdminView">
      <div>
        <img
          className="userImg"
          src={
            elem.img != null
              ? `http://localhost:3000/images/users/${elem.img}`
              : `http://localhost:3000/images/users/descarga.png`
          }
          alt=""
        />
      </div>
      <div className="d-flex justify-content-center align-items-center text-center">
        <div className="Carddivs mb-3">
          <div className="divP">
            <p className="datosCard">{elem.nickname}</p>
            <p className="datosCard">{elem.total_followers} Seguidores</p>
          </div>
          <div className="divP">
            <p className="datosCard">{elem.correct_posts} Trade Acertados</p>
            <p className="datosCard">{elem.incorrect_posts} Trade Errados</p>
          </div>
        </div>
        <div className="button1">
          <Button
            variant="danger"
            className="text-dark"
            onClick={() => activateUser(elem?.user_id, elem?.is_disabled)}
          >
            {elem.is_disabled ? "Activar" : "Desactivar"}
          </Button>
        </div>
      </div>
    </Container>
  );
};
