import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../context/AscendioContext";
import "./EditUser.scss";
import { FormEdit } from "./EditUserData/FormEdit";
import { ChangePassword } from "./ChangePassword/ChangePassword";


export const EditUser = () => {
  const { user, setUser } = useContext(AscendioContext);
  const [showForm, setShowForm] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const navigate = useNavigate();  

  

  const verSection = () => {
    if (showChangePassword) {      
      setShowChangePassword(false)
    } 
    setShowForm(true);
  };

  const verChangePassword = () => {
    if (showForm) {      
      setShowForm(false)
    } 
    setShowChangePassword(true);
  };

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
  

        <h2>{user?.nickname}</h2>
        <p>
          {" "}
          {user?.name} {user?.lastname}
        </p>
        <Button onClick={() => verSection()}>Editar Usuario</Button>
        <Button onClick={() => verChangePassword()}>Cambiar Contraseña</Button>


        { showForm && <FormEdit
        
        
        setShowForm = {setShowForm}
        user = {user}
        setUser ={setUser}

        /> }
        { showChangePassword && <ChangePassword 
         user = {user}
        /> }
      </Col>
    </Row>
  );
};
