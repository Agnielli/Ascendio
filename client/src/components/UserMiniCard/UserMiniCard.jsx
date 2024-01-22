import React, { useEffect, useState } from "react";
import "./UserMiniCard.scss";
import { Button } from "react-bootstrap";
import axios from "axios";

export const UserMiniCard = ({ elem, setAllUsers, allUsers, updateUsers, setUpdateUsers}) => {

  const activateUser = (id, is_disabled) => {
    let url = `http://localhost:3000/admin/activateuser/${id}`
    if (is_disabled === 0) {
      url = `http://localhost:3000/admin/disableuser/${id}`
    }
    
    axios
      .put(url)
      .then((res) => {
        setUpdateUsers(!updateUsers)
        /* let temp
        if (is_disabled === 0) {
          temp = allUsers?.map((elem) => {
            if (elem.user_id === id) {
              elem.is_disabled = 1
              return (
                elem
              )
            } else {
              return (
                elem
              )
            }
          })
        } else {
          temp = allUsers?.map((elem) => {
            if (elem.user_id === id) {
              elem.is_disabled = 0
              return (
                elem
              )
            } else {
              return (
                elem
              )
            }
          }) */
    /*     } */
       /*  setAllUsers(temp) */
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
          <p>Numero aciertos: </p>
          <p>Numero errores: </p>
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

