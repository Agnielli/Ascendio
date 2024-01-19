import React, { useEffect, useState } from "react";
import "./UserMiniCard.scss";
import { Button } from "react-bootstrap";
import axios from "axios";

export const UserMiniCard = ({ elem }) => {
  const [show, setShow] = useState(true);
  const [disable, setDisable] = useState(elem.disabled === 1)
  const [activate, setActivate] = useState(elem.disabled === 0)

  const disableUser = async (id) => {
    await axios
      .put(`http://localhost:3000/admin/disableuser/${id}`)
      .then((res) => {
        setShow(!show);
        setDisable(disable)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const activateUser = async (id) => {
    await axios
      .put(`http://localhost:3000/admin/activateuser/${id}`)
      .then((res) => {
        console.log(res.data);
        setShow(!show);
        setActivate(activate)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, [show]);

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
            {show && (elem?.is_disabled === 0) ? (
              <Button onClick={() => disableUser(elem.user_id)}>
                Bloquear
              </Button>
            ) : (
              <Button
                className="me-2"
                onClick={() => activateUser(elem.user_id)}
              >
                Activar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
