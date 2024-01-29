import React, { useContext, useEffect, useState } from "react";
import "./users.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { AscendioContext } from "../../context/AscendioContext";
import axios from "axios";
import "../../../public/stylesheets/ButtonsApp.scss";

export const Users = () => {
  const { user } = useContext(AscendioContext);
  const [showContent, setShowContent] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [swhowCourse, setShowCourse] = useState(false);
  const [statisticsUser, setStatisticsUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/statisticsuser/${user.user_id}`)
      .then((res) => {
        setStatisticsUser(res.data.datos);
      })
      .catch((err) => console.log(err));
  }, [user]);

  let ratioTotal = 0;
  if (statisticsUser?.num_correct_posts !== 0) {
    ratioTotal =
      parseFloat(
        statisticsUser?.num_correct_posts / statisticsUser?.num_trades
      ) * 100;
  }

  return (
    <>
      <Row className="userRow">
        <Col
          xs={12}
          xl={6}
          className="d-flex flex-column w-50 gap-2 text-center p-5"
        >
         <div> 
            <div className="avatarProfilo">
              {user?.img ? (
                <img src={`http://localhost:3000/images/users/${user.img}`} />
              ) : (
                <p>{user?.nickname.charAt(0).toUpperCase()}</p>
              )}
            </div>
            <div className="pt-3">
            <h5>{user?.nickname}</h5>
            <h5>Categoria/s: {statisticsUser?.user_categories}</h5>
            </div>
            </div>
        </Col>
        <Col
          xs={12}
          xl={6}
          className="d-flex flex-column w-50 gap-2 text-center align-content-center justify-content-center p-5"
        >
          <div>
            <h3>
              {user?.name} {user?.lastname}
            </h3>
            <div className="d-flex flex-column gap-2">
              {/* <Button onClick={() => navigate("/edituser")} className="Button4">
                Editar perfil
              </Button> */}
              <Button
                className="Button4"
                onClick={() => setShowContent(!showContent)}
              >
                Crear Contenido
              </Button>
              {showContent && (
                <>
                  <Button
                    className="Button4"
                    onClick={() => setShowPost(!showPost)}
                  >
                    Crear Post
                  </Button>
                  {showPost && (
                    <>
                      <Button
                        className="Button4"
                        onClick={() => navigate("/createtrade")}
                      >
                        Crear TradePost
                      </Button>
                      <Button
                        className="Button4"
                        onClick={() => navigate("/creategeneralpost")}
                      >
                        Crear GeneralPost
                      </Button>
                    </>
                  )}
                  <Button
                    className="Button4"
                    onClick={() => navigate("/createcourse")}
                  >
                    Crear Curso
                  </Button>
                </>
              )}
              <Button
                className="Button4"
                onClick={() => setShowCourse(!swhowCourse)}
              >
                Cursos
              </Button>
              {swhowCourse && (
                <>
                  <Button
                    className="Button4"
                    onClick={() => navigate("/purchasecourse")}
                  >
                    Cursos Adquiridos
                  </Button>
                  <Button
                    className="Button4"
                    onClick={() => navigate("/savecourse")}
                  >
                    Cursos Guardados
                  </Button>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="userRow">
        <Col xs={12} className="d-flex flex-column w-100 gap-2 text-center p-5">
          {statisticsUser && (
            <Table style={{ backgroundColor: 'red' }} striped bordered className="estadisticas">
              <thead>
                <tr>
                  {[
                    "Seguidores",
                    "Seguidos",
                    "Post Publicados",
                    "Ratio Pronóstico",
                    "Aciertos",
                    "Errores",
                    "Cursos publicados",
                  ].map((label) => (
                    <th key={label} className="texto-blanco">{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td key="1">
                    {" "}
                    <Link to={`/userfollowers/${user.user_id}`} className="enlace-rojo">
                      {statisticsUser.num_followers}
                    </Link>
                  </td>
                  <td key="2">
                    <Link to={`/userfollowing/${user.user_id}`} className="enlace-rojo">
                      {statisticsUser.num_following_users}
                    </Link>
                  </td>
                  <td key="3">
                    <Link to={`/userposts/${user.user_id}`} className="enlace-rojo">
                      {statisticsUser.num_posts}
                    </Link>
                  </td>
                  <td key="4">{ratioTotal} %</td>
                  <td key="5">{statisticsUser.num_correct_posts}</td>
                  <td key="6">{statisticsUser.num_incorrect_posts}</td>
                  <td key="7">
                    {" "}
                    <Link to={`/oneusercourses/${user.user_id}`} className="enlace-rojo">
                      {statisticsUser.num_courses}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};
