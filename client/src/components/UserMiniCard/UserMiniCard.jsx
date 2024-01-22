import React, { useEffect, useState } from "react";
import "./UserMiniCard.scss";
import { Button } from "react-bootstrap";
import axios from "axios";
export const UserMiniCard = ({ elem, allUsers, setAllUsers}) => {
  const [show, setShow] = useState(true); /* active */
  const [temporal, setTemporal] = useState();
  // const [onOff, setOnOff] = useState(); /* mostrar visibilidad de usuarios */


  const disableUser = (id) => {
    axios
      .put(`http://localhost:3000/admin/disableuser/${id}`)
      .then((res) => {
        setShow(!show); /* pone el show = false -> disable */
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const activateUser = (id) => {
     axios
      .put(`http://localhost:3000/admin/activateuser/${id}`)
      .then((res) => {
        console.log(res.data);
        setShow(!show); /* pone el show = true -> active */
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/adminusers")
      .then((res) => {
        setAllUsers(res.data);
        // setReset(!reset);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [show]);


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
            {show && (elem?.is_disabled === 1) ? (
              <Button onClick={() => activateUser(elem.user_id)}>
                Active
              </Button>
            ) : (
              <Button
                className="me-2"
                onClick={() => disableUser(elem.user_id)}
              >
                Disable
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

