import React, { useEffect, useState } from "react";
import "./adminHome.scss";
import { Button, Col, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserMiniCard } from "../../../components/UserMiniCard/UserMiniCard";
import { AdminAllUsers } from "../../../components/AdminAllUsers/AdminAllUsers";

export const AdminHome = () => {
  const navigate = useNavigate();
  const [showUsers, setShowUsers] = useState(false);
  const [allUsers, setAllusers] = useState();
 
  const showAllUsers = () => {
    setShowUsers(!showUsers)
  };

  return (
    <Row>
      <Col className="d-flex flex-column gap-2">
        <h3>Administrador</h3>
        <Button onClick={() => showAllUsers()}>Usuarios</Button>
        <Button onClick={() => navigate("allcourses")}>Cursos</Button>
        <Button onClick={() => navigate("alldata")}>Estadisticas</Button>
      </Col>
      <Col>
        <h3>Aquí va toda la información</h3>
        <Outlet />
      </Col>
      <div className="UsersViewAdmin">
        <AdminAllUsers allUsers={allUsers} setAllusers={setAllusers}/>
      </div>
    </Row>
  );
};
