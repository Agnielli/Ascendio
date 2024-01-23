import React, { useEffect, useState } from "react";
import "./adminHome.scss";
import { Button, Col, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminAllUsers } from "../../../components/AdminAllUsers/AdminAllUsers";
import { Estadisticas } from "../AdminEstadisticas/Estadisticas";
import { OneComment } from "../../../components/OneComment/OneComment";



export const AdminHome = () => {
  const navigate = useNavigate();
  const [showUsers, setShowUsers] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showTrades, setShowTrades] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [allUsers, setAllUsers] = useState();

  const showAllUsers = () => {
    setShowUsers(!showUsers);
    setShowStats(false);
  };

  const showStatistics = () => {
    setShowStats(!showStats);
    setAllUsers(false);
  };

  const showAllTrades = () => {
    setShowTrades(!showTrades);
  };

  const showAllComments = () => {
    setShowComments(!showComments)
  };

  const showAllPosts = () => {
    setShowPost(!showPost)
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
        <Button onClick={() => showStatistics()}>Estadisticas</Button>
        <Button onClick={() => showAllTrades()}>Comentarios</Button>
        <div>
          {showTrades && (
            <div>
              <Button onClick={() => showAllPosts()}>Posts</Button>
              
              <Button onClick={() => showAllComments()}>Comments</Button>
              {showComments && 
                <OneComment />
              }
            </div>
          )}
        </div>
      </Col>
      <Col>
        <h3>Aquí va toda la información</h3>
        <div className="UsersViewAdmin">
          {showUsers === true && (
            <AdminAllUsers allUsers={allUsers} setAllUsers={setAllUsers} />
          )}
        </div>
        <div>{showStats === true && <Estadisticas />}</div>
      </Col>
    </Row>
  );
};
