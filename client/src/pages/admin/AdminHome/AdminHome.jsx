import React, { useEffect, useState } from "react";
import "./adminHome.scss";
import { Button, Col, Row } from "react-bootstrap";
import { AdminAllUsers } from "../../../components/AdminAllUsers/AdminAllUsers";
import { Estadisticas } from "../AdminEstadisticas/Estadisticas";
import { OneComment } from "../../../components/OneComment/OneComment";
import { AdminDisabledUsers } from "../../../components/AdminDisabledUsers/AdminDisabledUsers";
import { AdminActivateUser } from "../../../components/AdminActivateUser/AdminActivateUser";
import { AdminCourses } from "../../../components/AdminCourses/AdminCourses";
import { DisabledCoursesMap } from "../../../components/DisabledCoursesMap/DisabledCoursesMap";
import { EnabledCoursesMap } from "../../../components/EnabledCoursesMap/EnabledCoursesMap";
import { TradesPostMap } from "../../../components/TradesPostMap/TradesPostMap";

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
  const [showCourseButtons, setShowCourseButtons] = useState(false)
  const [showDisabledCourses, setShowDisabledCourses] = useState(false)
  const [showEnabledCourses, setShowEnabledCourses] = useState(false)
  const [allUsers, setAllUsers] = useState();

  const showButtons = () => {
    setShowUserButtons(!showUserButtons);
    setShowCourseButtons(false)
    setShowTrades(false);
  };

  const showAllCourseButtons = () => {
    setShowCourseButtons(!showCourseButtons)
    setShowUserButtons(false);
    setShowTrades(false);
  }

  const showAllUsers = () => {
    setShowUsers(!showUsers);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowDisabledUsers(false)
    setShowActivatedUsers(false)
    setShowEnabledCourses(false)
    setShowDisabledCourses(false)
    setShowCourseButtons(false)
  };

  const showAllDisabledUsers = () => {
    setShowDisabledUsers(!showDisabledUsers)
    setShowUsers(false);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowActivatedUsers(false)
    setShowEnabledCourses(false)
    setShowDisabledCourses(false)
    setShowCourseButtons(false)
  }

  const showAllActivatedUsers = () => {
    setShowActivatedUsers(!showActivatedUsers)
    setShowUsers(false);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowDisabledUsers(false)
    setShowEnabledCourses(false)
    setShowDisabledCourses(false)
    setShowCourseButtons(false)
  }

  const showStatistics = () => {
    setShowStats(!showStats);
    setShowUsers(false);
    setShowTrades(false);
    setShowCourses(false);
    setShowDisabledUsers(false)
    setShowActivatedUsers(false)
    setShowUserButtons(false);
    setShowEnabledCourses(false)
    setShowDisabledCourses(false)
    setShowCourseButtons(false)
  };

  const showAllCourses = () => {
    setShowCourses(!showCourses);
    setShowStats(false);
    setShowTrades(false);
    setShowUsers(false);
    setShowDisabledUsers(false)
    setShowActivatedUsers(false)
    setShowUserButtons(false);
    setShowEnabledCourses(false)
    setShowDisabledCourses(false)
  };

  const showAllDisabledCourses = () => {
    setShowDisabledCourses(!showDisabledCourses)
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowUsers(false);
    setShowDisabledUsers(false)
    setShowActivatedUsers(false)
    setShowUserButtons(false);
    setShowEnabledCourses(false)
  }

  const showAllEnabledCourses = () => {
    setShowEnabledCourses(!showEnabledCourses)
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowUsers(false);
    setShowDisabledUsers(false)
    setShowActivatedUsers(false)
    setShowUserButtons(false);
    setShowDisabledCourses(false)
  }

  const showAllTrades = () => {
    setShowTrades(!showTrades);
    setShowStats(false);
    setShowCourses(false);
    setShowUsers(false);
    setShowDisabledUsers(false)
    setShowActivatedUsers(false)
    setShowUserButtons(false);
    setShowEnabledCourses(false)
    setShowDisabledCourses(false)
    setShowCourseButtons(false)
  };

  const showAllComments = () => {
    setShowComments(!showComments);
    setShowPost(false);
  };

  const showAllPosts = () => {
    setShowPost(!showPost);
    setShowComments(false);
  };

  return (
    <Row>
      <Col className="d-flex flex-column gap-2">
        <h3>Administrador</h3>
        <Button onClick={() => showButtons()}>Usuarios</Button>
        <Button onClick={() => showAllCourseButtons()}>Cursos</Button>
        <Button onClick={() => showStatistics()}>Estadisticas</Button>
        <Button onClick={() => showAllTrades()}>Trades</Button>
        <div>
          {showTrades && (
            <div>
              <Button onClick={() => showAllPosts()}>Posts Trades</Button>
              <Button onClick={() => showAllComments()}>Posts General</Button>
              {showComments && <OneComment />}
              {showPost && <TradesPostMap />}
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
        
        <div>{showStats === true && <Estadisticas />}</div>
      </Col>
        {showCourseButtons &&
          <div>
            <Button onClick={() => showAllCourses()}>Todos los cursos</Button>
            <Button onClick={() => showAllEnabledCourses()}>Cursos Activos</Button>
            <Button onClick={() => showAllDisabledCourses()}>Cursos Bloqueados</Button>

            {showCourses && <AdminCourses />}
            {showDisabledCourses && <DisabledCoursesMap />}
            {showEnabledCourses && <EnabledCoursesMap />}
          </div>
        }
    </Row>
  );
};
