import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./DisabledUserCard.scss";

export const DisabledUserCard = ({ elem, update, setUpdate }) => {
  const activateUser = (id) => {
    axios
      .put(`http://localhost:3000/admin/activateuser/${id}`)
      .then((res) => {
        console.log(res);
        setUpdate(true);
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
            onClick={() => activateUser(elem.user_id)}
          >
            Activar
          </Button>
        </div>
      </div>
    </div>
  );
};
