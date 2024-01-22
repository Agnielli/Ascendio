import React, { useEffect, useState } from "react";
import "./adminHome.scss";
import { Button, Col, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminAllUsers } from "../../../components/AdminAllUsers/AdminAllUsers";
export const AdminHome = () => {
  const navigate = useNavigate();
  const [showUsers, setShowUsers] = useState(false);
  const [allUsers, setAllUsers] = useState();
  const showAllUsers = () => {
    setShowUsers(!showUsers);
  };

  return (
    <Row>
      <Col className="d-flex flex-column gap-2">
        <h3>Administrador</h3>
        <Button onClick={() => showAllUsers()}>Usuarios</Button>
        <Button
          onClick={() => {
            navigate("allcourses");
            setShowUsers(false);
          }}
        >
          Cursos
        </Button>
        <Button onClick={() => navigate("alldata")}>Estadisticas</Button>
      </Col>
      <Col>
        <Outlet />
        <h3>Aquí va toda la información</h3>
        <div className="UsersViewAdmin">
          {showUsers === true && (
            <AdminAllUsers allUsers={allUsers} setAllUsers={setAllUsers} />
          )}
        </div>
      </Col>
    </Row>
  );
};
