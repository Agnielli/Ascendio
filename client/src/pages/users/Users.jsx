import React, { useContext, useEffect, useState } from "react";
import "./users.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AscendioContext } from "../../context/AscendioContext";
import axios from "axios";

export const Users = () => {
  const { user } = useContext(AscendioContext);
  const [showContent, setShowContent] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [swhowCourse, setShowCourse] = useState(false);
  const [statisticsUser, setStatisticsUser] = useState();

  const navigate = useNavigate();

  console.log(user.user_id);
  //SACAR numero de seguidores del usuario logueado
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/statisticsuser/${user.user_id}`)
      .then((res) => {
        console.log(res);
        setStatisticsUser(res.data.datos);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className="d-flex flex-column w-25 gap-2">
      <div className="avatar">
        {user?.img ? (
          <img src={`http://localhost:3000/images/users/${user.img}`} />
        ) : (
          <p>{user?.name.charAt(0).toUpperCase()}</p>
        )}
      </div>
      <h2>{user?.nickname}</h2>
      <p>
        {" "}
        {user?.name} {user?.lastname}
      </p>
      {statisticsUser && (
        <>
          <p>
            Seguidores:{" "}
            <Link to={`/userfollowers/${user.user_id}`}>
              {statisticsUser.num_followers}
            </Link>
          </p>
          <p>
          Siguiendo:{" "}
            <Link to={`/userfollowing/${user.user_id}`}>
              {statisticsUser.num_following_users}
            </Link>
          </p>
          <p>
            Posts publicados:{" "}
            <Link to={`/userposts/${user.user_id}`}>
              {" "}
              {statisticsUser.num_posts}
            </Link>
          </p>
          <p>Aciertos: {statisticsUser.num_correct_posts}</p>
          <p>Errores: {statisticsUser.num_incorrect_posts}</p>
          <p>Cursos publicados: {statisticsUser.num_courses}</p>{" "}
        </>
      )}

      <Button onClick={() => navigate("/edituser")}>Editar perfil</Button>
      <Button variant="primary" onClick={() => setShowContent(!showContent)}>
        Crear Contenido
      </Button>
      {showContent && (
        <>
          <Button variant="danger" onClick={() => setShowPost(!showPost)}>
            Crear Post
          </Button>
          {showPost && (
            <>
              <Button
                variant="warning"
                onClick={() => navigate("/createtrade")}
              >
                Crear TradePost
              </Button>
              <Button
                variant="warning"
                onClick={() => navigate("/creategeneralpost")}
              >
                Crear GeneralPost
              </Button>
            </>
          )}
          <Button variant="danger" onClick={() => navigate("/createcourse")}>
            Crear Curso
          </Button>
        </>
      )}
      <Button onClick={() => setShowCourse(!swhowCourse)}>Cursos</Button>
      {swhowCourse && (
        <>
          <Button variant="success" onClick={() => navigate("/purchasecourse")}>
            Cursos Adquiridos
          </Button>
          <Button variant="success" onClick={() => navigate("/savecourse")}>
            Cursos Guardados
          </Button>
          <Button variant="success">¿Cursos Creados?</Button>
        </>
      )}
    </div>
  );
};
