import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./UserFollowers.scss";

export const UserFollowers = () => {
  const [followers, setFollowers] = useState([]);
  const [followersFilter, setFollowersFilter] = useState([]);
  const [statisticsUser, setStatisticsUser] = useState();
  const [search, setSearch] = useState("");
  const [followingUsers, setFollowingUsers] = useState([]); // Nuevo estado para almacenar usuarios seguidos
  const { user } = useContext(AscendioContext);
  const navigate = useNavigate();

  // Fiabilidad de usuarios

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/statisticsuser/${user.user_id}`)
      .then((res) => {
        // console.log("datos del usuario", res.data);
        setStatisticsUser(res.data.datos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  // para obtener los usuarios que me siguen
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/users/followersuser/${user.user_id}`)
        .then((res) => {
          setFollowers(res.data.datos);
          setFollowersFilter(res.data.datos);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  // para poner los botones en seguir o siguiendo si user existe
  user &&
    useEffect(() => {
      const user_id = user.user_id;
      axios
        .get(`http://localhost:3000/users/getfollowuser/${user_id}`)
        .then((res) => {
          // console.log(res.data);
          // esto permite que al recargar me cargue el estado followingUsers con los usuarios a los que seguimos
          setFollowingUsers(res.data.map((user) => user.followed_user_id));
        })
        .catch((err) => {
          console.log(err);
        });
    }, [user]);

  // Función para seguir o dejar de seguir a un usuario
  const pulsarSeguirONo = (id_followed) => {
    const data = [user.user_id, id_followed];
    const isFollowing = followingUsers.includes(id_followed); // devuelve true o false
    if (isFollowing) {
      // Dejar de seguir
      axios
        .delete(`http://localhost:3000/users/unfollowUser`, { data })
        .then((res) => {
          // console.log(res.data);
          setFollowingUsers((prevFollowingUsers) =>
            prevFollowingUsers.filter((userId) => userId !== id_followed)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Seguir
      axios
        .post(`http://localhost:3000/users/followUser`, data)
        .then((res) => {
          // setFollowingUsers([...followingUsers, id_followed]);
          setFollowingUsers((prevFollowingUsers) => [
            ...prevFollowingUsers,
            id_followed,
          ]);
          // console.log([...followingUsers, id_followed]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (e) => {
    const searchFilter = e.target.value;
    setSearch(searchFilter);
    if (search !== "") {
      setFollowersFilter(
        followers.filter((patata) =>
          patata.nickname.toLowerCase().includes(searchFilter.toLowerCase())
        )
      );
    } else {
      setFollowersFilter(followers);
    }
  };

  let ratioTotal = 0;
  if (statisticsUser?.num_correct_posts !== 0) {
    ratioTotal =
      parseFloat(
        statisticsUser?.num_correct_posts / statisticsUser?.num_trades
      ) * 100;
  }

  return (
    <>
      <Row>
        <Col>
          <Row className="d-flex RowShowAllUsersHeader">
            <Col className="d-flex flex-column p-5">
              <div className="d-flex gap-5">
                <h2>Mis seguidores</h2>
                <Button
                  className="Button4"
                  onClick={() => navigate("/profile")}
                >
                  Volver
                </Button>
              </div>
            </Col>
            <Col>
              <div className="input-container mt-5 BuscadorShowAllUsers">
                <input
                  className="buscador"
                  onChange={handleChange}
                  placeholder="🔍..."
                  value={search}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="UserFollower row-gap-4 ShowAllUserPaddings2-10">
        {followersFilter?.map((elem) => {
          return (
            <Col xs={12} className="d-flex justify-content-center">
              <div className="flex-wrap d-flex align-items-center justify-content-between gap-xl-4 UserFollowerCard">
                <div className="DivContainer3divs d-flex">
                  <div className="AdminUserImg">
                    <img
                      src={
                        elem.img != null
                          ? `http://localhost:3000/images/users/${elem.img}`
                          : `http://localhost:3000/images/users/descarga.png`
                      }
                      alt="Imagen de perfil del usuario"
                    />
                  </div>
                  <div className="d-flex gap-5 align-items-center d-flex justify-content-evenly w-100">
                    <div className="d-flex flex-column justify-content-center text-center">
                      <div className="d-flex justify-content-center justify-content-xl-start gap-2 gap-xl-3 ms-5 me-5">
                        <p className="fw-bold">{elem.nickname}</p>
                      </div>
                      <div>
                      Fiabilidad: {parseFloat(ratioTotal.toFixed(2))} %
                      </div>
                    </div>
                    <div className="UserButton">
                      {user.user_id !== elem.user_id ? (
                        <Button
                          className="Button3"
                          onClick={() => pulsarSeguirONo(elem.user_id)}
                        >
                          {followingUsers.includes(elem.user_id)
                            ? "Dejar de Seguir"
                            : "Seguir También"}
                        </Button>
                      ) : (
                        <Button
                          className="Button3"
                          onClick={() => navigate(`/userposts/${user.user_id}`)}
                        >
                          Ir a posts
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
