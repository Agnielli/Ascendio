import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../context/AscendioContext";
import "./EditUser.scss";
import { FormEdit } from "./EditUserData/FormEdit";
import { ChangePassword } from "./ChangePassword/ChangePassword";


export const EditUser = () => {
  const { user, setUser } = useContext(AscendioContext);
  

  const [file, setFile] = useState();
  const [showForm, setShowForm] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const navigate = useNavigate();  

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

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
        <div className="avatar">
          <label htmlFor="fileInput">
            {user?.img ? (
              <img
                src={`http://localhost:3000/images/users/${user?.img}`}
                alt="Avatar"
              />
            ) : (null
              // <p>{user?.name.charAt(0).toUpperCase()}</p> 
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleFile}
          />
        </div>

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
