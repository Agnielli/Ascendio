import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../context/AscendioContext";
import "./EditUser.scss";
import { FormEdit } from "./EditUserData/FormEdit";
import { ChangePassword } from "./ChangePassword/ChangePassword";
import { DeleteUser } from "./DeleteUser/DeleteUser";

export const EditUser = () => {
  const { user, setUser } = useContext(AscendioContext);
  const [showForm, setShowForm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  const navigate = useNavigate();

  const verSection = () => {
    setShowForm(true);
    setShowChangePassword(false);
    setShowDeleteUser(false);
  };

  const verChangePassword = () => {
    setShowForm(false);
    setShowChangePassword(true);
    setShowDeleteUser(false);
  };

  const verDeleteUser = () => {
    setShowForm(false);
    setShowChangePassword(false);
    setShowDeleteUser(true);
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
        <Button onClick={() => verChangePassword()}>
          Editar datos de Login{" "}
        </Button>
        <Button onClick={() => verDeleteUser()}>Eliminar cuenta </Button>

        {showForm && (
          <FormEdit setShowForm={setShowForm} user={user} setUser={setUser} />
        )}
        {showChangePassword && (
          <ChangePassword
            setShowChangePassword={setShowChangePassword}
            user={user}
            setUser={setUser}
          />
        )}

        {showDeleteUser && <DeleteUser 
        setShowDeleteUser={setShowDeleteUser}
        user={user}
        setUser={setUser}
        
        />}
      </Col>
    </Row>
  );
};
