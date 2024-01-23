import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export const ActivatedUserMiniCard = ({ elem, update, setUpdate }) => {
  
  const disableUser = (id) => {
    axios
      .put(`http://localhost:3000/admin/disableuser/${id}`)
      .then((res) => {
        console.log(res);
        setUpdate(true)
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
          <p>Numero aciertos: </p>
          <p>Numero errores: </p>
          <div className="d-flex flex-row justify-content-center">
            <Button onClick={() => disableUser(elem.user_id)}>
              Desactivar Usuario
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
