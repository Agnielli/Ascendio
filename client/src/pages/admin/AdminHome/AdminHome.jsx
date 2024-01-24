import React, { useEffect, useState } from "react";
import "./adminHome.scss";
import { Button, Col, Row } from "react-bootstrap";
import { AdminAllUsers } from "../../../components/AdminAllUsers/AdminAllUsers";
import { Estadisticas } from "../AdminEstadisticas/Estadisticas";
import { OneComment } from "../../../components/OneComment/OneComment";
import { AdminDisabledUsers } from "../../../components/AdminDisabledUsers/AdminDisabledUsers";
import { AdminActivateUser } from "../../../components/AdminActivateUser/AdminActivateUser";
import { AdminCourses } from "../../../components/AdminCourses/AdminCourses";

export const AdminHome = () => {
  const [showUserButtons, setShowUserButtons] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showDisabledUsers, setShowDisabledUsers] = useState(false)
  const [showActivatedUsers, setShowActivatedUsers] = useState(false)
  const [showStats, setShowStats] = useState(false);
  const [showTrades, setShowTrades] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [allUsers, setAllUsers] = useState();

  const showButtons = () => {
    setShowUserButtons(!showUserButtons);
  };

  const showAllUsers = () => {
    setShowUsers(!showUsers);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowDisabledUsers(false)
    setShowActivatedUsers(false)
  };

  const showAllDisabledUsers = () => {
    setShowDisabledUsers(!showDisabledUsers)
    setShowUsers(false);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowActivatedUsers(false)
  }

  const showAllActivatedUsers = () => {
    setShowActivatedUsers(!showActivatedUsers)
    setShowUsers(false);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowDisabledUsers(false)
  }

  const showStatistics = () => {
    setShowStats(!showStats);
    setShowUsers(false);
    setShowTrades(false);
    setShowCourses(false);
    setShowDisabledUsers(false)
    setShowActivatedUsers(false)
    setShowUserButtons(false);
  };

  const showAllCourses = () => {
    setShowCourses(!showCourses);
    setShowStats(false);
    setShowTrades(false);
    setShowUsers(false);
    setShowDisabledUsers(false)
    setShowActivatedUsers(false)
    setShowUserButtons(false);
  };

  const showAllTrades = () => {
    setShowTrades(!showTrades);
    setShowStats(false);
    setShowCourses(false);
    setShowUsers(false);
    setShowDisabledUsers(false)
    setShowActivatedUsers(false)
    setShowUserButtons(false);
  };

  const showAllComments = () => {
    setShowComments(!showComments);
  };

  const showAllPosts = () => {
    setShowPost(!showPost);
  };

  return (
    <Row>
      <Col className="d-flex flex-column gap-2">
        <h3>Administrador</h3>
        <Button onClick={() => showButtons()}>Usuarios</Button>
        <Button onClick={() => showAllCourses()}>Cursos</Button>
        <Button onClick={() => showStatistics()}>Estadisticas</Button>
        <Button onClick={() => showAllTrades()}>Trades</Button>
        <div>
          {showTrades && (
            <div>
              <Button onClick={() => showAllPosts()}>Posts Trades</Button>
              

              <Button onClick={() => showAllComments()}>Posts General</Button>
              {showComments && <OneComment />}
            </div>
          )}
        </div>
      </Col>
      <Col>
        <h3>Aquí va toda la información</h3>
        <div className="UsersViewAdmin">
          {showUserButtons === true && (
            <div>
              <div>
                <Button onClick={() => showAllUsers()}>
                  Todos los usuarios
                </Button>
                <Button onClick={() => showAllActivatedUsers()}>Usuarios Activos</Button>
                <Button onClick={() => showAllDisabledUsers()}>Usuarios Bloqueados</Button>
              </div>
              {showUsers === true && (
                <AdminAllUsers allUsers={allUsers} setAllUsers={setAllUsers} />
              )}
              {showDisabledUsers === true &&
              <AdminDisabledUsers />
              }
              {showActivatedUsers === true &&
              <AdminActivateUser />
              }
            </div>
          )}
        </div>
        <div>{showCourses === true && <AdminCourses />}</div>
        <div>{showStats === true && <Estadisticas />}</div>
      </Col>
    </Row>
  );
};
