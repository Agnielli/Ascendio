import React, { useEffect, useState } from "react";
import "./UserMiniCard.scss";
import { Button } from "react-bootstrap";
import axios from "axios";

export const UserMiniCard = ({ elem, updateUsers, setUpdateUsers}) => {

  const activateUser = (id, is_disabled) => {
    let url = `http://localhost:3000/admin/activateuser/${id}`
    if (is_disabled === 0) {
      url = `http://localhost:3000/admin/disableuser/${id}`
    }
    
    axios
      .put(url)
      .then((res) => {
        setUpdateUsers(!updateUsers)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="userMiniCardAdminView">
      <div className="d-flex flex-column">
        <div className="userImg">{elem.img}</div>
        <p>{elem.nickname}</p>
        <p>Seguidores: </p>
      </div>
      <div className="d-flex flex-row">
        <div className="d-flex flex-column mt-5 ms-3">
          <p>Numero aciertos: {elem.correct_posts}</p>
          <p>Numero errores: {elem.incorrect_posts}</p>
          <div className="d-flex flex-row justify-content-center">           
              <Button onClick={() => activateUser(elem?.user_id, elem?.is_disabled)}>
                {elem.is_disabled ? "Activar" :
                "Desactivar"}
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

