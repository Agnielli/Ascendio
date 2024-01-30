import React, { useEffect, useState } from "react";
import "./AdminHome.scss";
import { Button, Col, Container, Row } from "react-bootstrap";
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
  const [showDisabledUsers, setShowDisabledUsers] = useState(false);
  const [showActivatedUsers, setShowActivatedUsers] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showTrades, setShowTrades] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showCourseButtons, setShowCourseButtons] = useState(false);
  const [showDisabledCourses, setShowDisabledCourses] = useState(false);
  const [showEnabledCourses, setShowEnabledCourses] = useState(false);
  const [allUsers, setAllUsers] = useState();

  const showButtons = () => {
    setShowUserButtons(!showUserButtons);
    setShowCourseButtons(false);
    setShowTrades(false);
    setShowStats(false);
  };

  const showAllCourseButtons = () => {
    setShowCourseButtons(!showCourseButtons);
    setShowUserButtons(false);
    setShowTrades(false);
    setShowStats(false);
  };

  const showAllUsers = () => {
    setShowUsers(!showUsers);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowDisabledUsers(false);
    setShowActivatedUsers(false);
    setShowEnabledCourses(false);
    setShowDisabledCourses(false);
    setShowCourseButtons(false);
  };

  const showAllDisabledUsers = () => {
    setShowDisabledUsers(!showDisabledUsers);
    setShowUsers(false);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowActivatedUsers(false);
    setShowEnabledCourses(false);
    setShowDisabledCourses(false);
    setShowCourseButtons(false);
  };

  const showAllActivatedUsers = () => {
    setShowActivatedUsers(!showActivatedUsers);
    setShowUsers(false);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowDisabledUsers(false);
    setShowEnabledCourses(false);
    setShowDisabledCourses(false);
    setShowCourseButtons(false);
  };

  const showStatistics = () => {
    setShowStats(!showStats);
    setShowUsers(false);
    setShowTrades(false);
    setShowCourses(false);
    setShowDisabledUsers(false);
    setShowActivatedUsers(false);
    setShowUserButtons(false);
    setShowEnabledCourses(false);
    setShowDisabledCourses(false);
    setShowCourseButtons(false);
  };

  const showAllCourses = () => {
    setShowCourses(!showCourses);
    setShowStats(false);
    setShowTrades(false);
    setShowUsers(false);
    setShowDisabledUsers(false);
    setShowActivatedUsers(false);
    setShowUserButtons(false);
    setShowEnabledCourses(false);
    setShowDisabledCourses(false);
  };

  const showAllDisabledCourses = () => {
    setShowDisabledCourses(!showDisabledCourses);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowUsers(false);
    setShowDisabledUsers(false);
    setShowActivatedUsers(false);
    setShowUserButtons(false);
    setShowEnabledCourses(false);
  };

  const showAllEnabledCourses = () => {
    setShowEnabledCourses(!showEnabledCourses);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowUsers(false);
    setShowDisabledUsers(false);
    setShowActivatedUsers(false);
    setShowUserButtons(false);
    setShowDisabledCourses(false);
  };

  const showAllTrades = () => {
    setShowTrades(!showTrades);
    setShowStats(false);
    setShowCourses(false);
    setShowUsers(false);
    setShowDisabledUsers(false);
    setShowActivatedUsers(false);
    setShowUserButtons(false);
    setShowEnabledCourses(false);
    setShowDisabledCourses(false);
    setShowCourseButtons(false);
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
    <main className="AdminRow">
      <Row className="justify-content-center align-items-center text-center row-gap-4 my-5">
        <Col xs={12}>
          <h3 className="text-center text-danger">Administrador</h3>
        </Col>
        <Col className="ButtonsRow" lg={3} md={6} xs={6}>
          <Button className="Button4" onClick={() => showButtons()}>
            Usuarios
          </Button>
        </Col>
        <Col className="ButtonsRow" lg={3} md={6} xs={6}>
          <Button
            variant="danger"
            className="text-dark"
            onClick={() => showAllCourseButtons()}
          >
            Cursos
          </Button>
        </Col>
        <Col className="ButtonsRow" lg={3} md={6} xs={6}>
          <Button
            variant="danger"
            className="text-dark"
            onClick={() => showStatistics()}
          >
            Estadisticas
          </Button>
        </Col>
        <Col className="ButtonsRow" lg={3} md={6} xs={6}>
          <Button
            variant="danger"
            className="text-dark"
            onClick={() => showAllTrades()}
          >
            Trades
          </Button>
        </Col>
      </Row>
       <div>
        {showTrades && (
          <div>
            <Button className="Button1" onClick={() => showAllPosts()}>
              Posts Trades
            </Button>
            <Button onClick={() => showAllComments()}>Posts General</Button>
            {showComments && <OneComment />}
            {showPost && <TradesPostMap />}
          </div>
        )}
      </div>
      <div className="">
        {showUserButtons === true && (
          <>
            <Row className="ButtonsRow2 d-flex justify-content-center align-items-center text-center my-5">
              <Col lg={2} md={3} xs={12}>
                <Button className="ButtonNoBG" onClick={() => showAllUsers()}>
                  Todos
                </Button>
              </Col>
              <Col lg={2} md={3} xs={12}>
                <Button
                  className="ButtonNoBG"
                  onClick={() => showAllActivatedUsers()}
                >
                  Activos
                </Button>
              </Col>
              <Col lg={2} md={3} xs={12}>
                <Button
                  className="ButtonNoBG"
                  onClick={() => showAllDisabledUsers()}
                >
                  Bloqueados
                </Button>
              </Col>
            </Row>

            <Row className="row-gap-4">
              {showUsers === true && (
                <AdminAllUsers allUsers={allUsers} setAllUsers={setAllUsers} />
              )}
              {showDisabledUsers === true && <AdminDisabledUsers />}
              {showActivatedUsers === true && <AdminActivateUser />}
            </Row>
          </>
        )}
      </div>

      <div>{showStats === true && <Estadisticas />}</div>

      <div className="">
        {showCourseButtons && (
          <>
            <Row className="ButtonsRow2 d-flex justify-content-center align-items-center text-center m-5">
              <Col lg={2} md={3} xs={12}>
                <Button className="ButtonNoBG" onClick={() => showAllCourses()}>
                  Todos los cursos
                </Button>
                <Button
                  className="ButtonNoBG"
                  onClick={() => showAllEnabledCourses()}
                >
                  Cursos Activos
                </Button>
                <Button
                  className="ButtonNoBG"
                  onClick={() => showAllDisabledCourses()}
                >
                  Cursos Bloqueados
                </Button>
              </Col>
            </Row>

            <Row>
              {showCourses && <AdminCourses />}
              {showDisabledCourses && <DisabledCoursesMap />}
              {showEnabledCourses && <EnabledCoursesMap />}
            </Row>
          </>
        )}
      </div> 
    </main>
  );
};
