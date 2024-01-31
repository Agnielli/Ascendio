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
    setShowPost(false);
    setShowComments(false);
  };

  const showAllCourseButtons = () => {
    setShowCourseButtons(!showCourseButtons);
    setShowUserButtons(false);
    setShowTrades(false);
    setShowStats(false);
    setShowComments(false);
    setShowPost(false);
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
    setShowComments(false);
    setShowPost(false);
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
    setShowComments(false);
    setShowPost(false);
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
    setShowComments(false);
    setShowPost(false);
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
    setShowComments(false);
    setShowPost(false);
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
    setShowComments(false);
    setShowPost(false);
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
    setShowComments(false);
    setShowPost(false);
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
    setShowComments(false);
    setShowPost(false);
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
      <Row>
        <Col
          xxl={3}
          xs={12}
          className="my-5"
        >
          <Row>
            <Col className="d-flex justify-content-center justify-content-xl-start" xs={12}>
              <h3 className="text-start mb-4 AscendioColor">Administrador</h3>
            </Col>
            <Col className="d-flex justify-content-center justify-content-xl-start ButtonsRow mb-4" xxl={12} lg={3} sm={6} xs={12}>
              <Button className="Button5" onClick={() => showButtons()}>
                Usuarios
              </Button>
            </Col>
            <Col className="d-flex justify-content-center justify-content-xl-start ButtonsRow" xxl={12} lg={3} sm={6} xs={12}>
              <Button
                className="Button5 mb-4"
                onClick={() => showAllCourseButtons()}
              >
                Cursos
              </Button>
            </Col>
            <Col className="d-flex justify-content-center justify-content-xl-start ButtonsRow mb-4" xxl={12} lg={3} sm={6} xs={12}>
              <Button className="Button5" onClick={() => showStatistics()}>
                Estadisticas
              </Button>
            </Col>
            <Col className="d-flex justify-content-center justify-content-xl-start ButtonsRow mb-4" xxl={12} lg={3} sm={6} xs={12}>
              <Button className="Button5" onClick={() => showAllTrades()}>
                Trades
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xxl={9} xs={12}>
          <>
            {showTrades && (
              <Row className="TradeButtonsRow text-center justify-content-center row-gap-4">
                <Col
                  xl={6}
                  md={6}
                  sm={6}
                  xs={12}
                  className="d-flex justify-content-center gap-5"
                >
                  <Button className="Button4" onClick={() => showAllPosts()}>
                    Trades
                  </Button>
                  <Button className="Button4" onClick={() => showAllComments()}>
                    General
                  </Button>
                </Col>
              </Row>
            )}
          </>

          <>
            {showPost && <TradesPostMap />}
            {showComments && <OneComment />}
          </>

          {showUserButtons === true && (
            <>
              <Row className="ButtonsRow2 d-flex justify-content-center align-items-center text-center mb-5 mt-5">
                <Col>
                  <Col>
                    <Button className="ButtonNoBG" onClick={() => showAllUsers()}>
                      Todos
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="ButtonNoBG"
                      onClick={() => showAllActivatedUsers()}
                    >
                      Activos
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="ButtonNoBG"
                      onClick={() => showAllDisabledUsers()}
                    >
                      Bloqueados
                    </Button>
                  </Col>
                </Col>
              </Row>
              <Row className="row-gap-4">
                {showUsers === true && (
                  <AdminAllUsers
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                  />
                )}
                {showDisabledUsers === true && <AdminDisabledUsers />}
                {showActivatedUsers === true && <AdminActivateUser />}
              </Row>
            </>
          )}

          <>{showStats === true && <Estadisticas />}</>

          {showCourseButtons && (
            <>
              <Row className="ButtonsRow2 d-flex justify-content-center align-items-center text-center m-5">
                <Col lg={2} md={3} xs={12}>
                  <Button
                    className="ButtonNoBG"
                    onClick={() => showAllCourses()}
                  >
                    Todos los cursos
                  </Button>
                </Col>
                <Col lg={2} md={3} xs={12}>
                  <Button
                    className="ButtonNoBG"
                    onClick={() => showAllEnabledCourses()}
                  >
                    Cursos Activos
                  </Button>
                </Col>
                <Col lg={2} md={3} xs={12}>
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
        </Col>
      </Row>
    </main>
  );
};
