import React, { useEffect, useState } from "react";
import "./UserMiniCard.scss";
import { Button } from "react-bootstrap";
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
    <div className="userMiniCardAdminView">
      <div>
        <img
          className="userImg"
          src={`http://localhost:3000/images/users/${elem.img}`}
          alt=""
        />
      </div>
      <div className="d-flex flex-row gap-5">
        <div className="divP">
          <p className="datosCard">{elem.nickname}</p>
          <p className="datosCard">Seguidores: {elem.total_followers}</p>
        </div>
        <div className="divP">
          <p className="datosCard">Numero aciertos: {elem.correct_posts}</p>
          <p className="datosCard">Numero errores: {elem.incorrect_posts}</p>
        </div>
        <div className="button1">
          <Button
            className=""
            onClick={() => activateUser(elem?.user_id, elem?.is_disabled)}
          >
            {elem.is_disabled ? "Activar" : "Desactivar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
