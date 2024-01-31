import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AscendioContext } from "../../../context/AscendioContext";
import { Button, Card, InputGroup, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./showallusers.scss";

export const ShowAllUsers = () => {
  const [show, setShow] = useState(1);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState();
  const [allUsersFilter, setAllUsersFilter] = useState();
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState("nickname");
  const { user } = useContext(AscendioContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (show === 1) {
      axios
        .get(`http://localhost:3000/users/showallusers`)
        .then((res) => {
          // console.log(res);
          setAllUsers(res.data.filter((elem) => elem.type === 2));
          setAllUsersFilter(res.data.filter((elem) => elem.type === 2));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (show === 2) {
      axios
        .get(`http://localhost:3000/users/showalluserssuccesses`)
        .then((res) => {
          setAllUsers(res.data.filter((elem) => elem.type === 2));
          setAllUsersFilter(res.data.filter((elem) => elem.type === 2));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [followingUsers, user, show]);

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
      setAllUsersFilter(
        allUsers.filter((patata) =>
          patata[options].toLowerCase().includes(searchFilter.toLowerCase())
        )
      );
    } else {
      setLastTradesFilter(allUsers);
    }
  };

  // console.log(options);

  return (
    <div>
      {show === 1 && (
        <>
          <div className="d-flex gap-1 m-4">
            <Button className="mb-2" onClick={() => setShow(2)}>
              Top Usuarios con más Aciertos
            </Button>
            <div className="d-flex gap-5 mb-1">
              <input
                onChange={handleChange}
                placeholder="🔍..."
                value={search}
              />
            </div>
            <InputGroup className="d-flex justify-content-center flex-column align-items-start">
              <label htmlFor="filter">Filtrar por:</label>
              <select
                id="filter"
                name="filter"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
              >
                <option value="nickname">Nickname</option>
                <option value="email">Email</option>
                <option value="name">Name</option>
                <option value="lastname">Lastname</option>
              </select>
            </InputGroup>
          </div>

          <h2 className="text-center mb-4">Top Usuarios con más Seguidores</h2>
          <div className="d-flex flex-column align-items-center flex-wrap gap-2">
            {allUsersFilter?.map((elem) => {
              return (
                <div key={elem.user_id} className="cards-showuser d-flex align-items-center justify-content-between gap-1 gap-xl-4 mb-2">
                  <div>
                    <img
                      className="userImg"
                      src={
                        elem.img != null
                          ? `http://localhost:3000/images/users/${elem.img}`
                          : `http://localhost:3000/images/users/descarga.png`
                      }
                      alt="Imagen de perfil del usuario"
                    />
                  </div>
                  <div className="d-flex flex-column flex-xl-row align-items-center text-center gap-4">
                    <div className="d-flex gap-2 gap-xl-3">
                      <div className="">
                        <p className="fw-bold">{elem.nickname}</p>
                        <p>{elem.followers_count} Seguidores</p>
                      </div>
                    </div>
                    <div className="">
                      <p>{elem.correct_posts} Acertados</p>
                      <p>{elem.incorrect_posts} Errados</p>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      {user.user_id !== elem.user_id ? (
                        <Button
                          variant="primary"
                          onClick={() => pulsarSeguirONo(elem.user_id)}
                        >
                          {followingUsers.includes(elem.user_id)
                            ? "Siguiendo"
                            : "Seguir"}
                        </Button>
                      ) : null}
                      <Button
                        onClick={() =>
                          navigate(`/traderprofile/${elem.user_id}`)
                        }
                      >
                        Ver más
                      </Button>
                    </div>
                  </div>
                  {/* Seguidores: {elem.followers_count}
                    Siguiendo: {elem.following_count}
                    Cursos publicados: {elem.total_courses}
                    Post publicados: {elem.total_posts}
                    Trades Acertados: {elem.correct_posts}
                    Trades Errados: {elem.incorrect_posts} */}
                </div>
              );
            })}
          </div>
        </>
      )}
      {show === 2 && (
        <>
          <div className="d-flex gap-1 m-4">
            <Button className="mb-2" onClick={() => setShow(1)}>
              Top Usuarios con más Seguidores
            </Button>
            <div className="d-flex gap-5 mb-1">
              <input
                onChange={handleChange}
                placeholder="🔍..."
                value={search}
              />
            </div>
          </div>

          <h2 className="text-center mb-4">Top Usuarios con más Aciertos</h2>
          <div className="d-flex flex-column align-items-center flex-wrap gap-2">
            {allUsersFilter?.map((elem) => {
              return (
                <div key={elem.user_id} className="cards-showuser d-flex align-items-center justify-content-between gap-1 gap-xl-4 mb-2">
                  <div>
                    <img
                      className="userImg"
                      src={
                        elem.img != null
                          ? `http://localhost:3000/images/users/${elem.img}`
                          : `http://localhost:3000/images/users/descarga.png`
                      }
                      alt="Imagen de perfil del usuario"
                    />
                  </div>
                  <div className="d-flex flex-column flex-xl-row align-items-center text-center gap-4">
                    <div className="d-flex gap-2 gap-xl-3">
                      <div className="">
                        <p className="fw-bold">{elem.nickname}</p>
                        <p>{elem.followers_count} Seguidores</p>
                      </div>
                    </div>
                    <div className="">
                      <p>{elem.correct_posts} Acertados</p>
                      <p>{elem.incorrect_posts} Errados</p>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      {user.user_id !== elem.user_id ? (
                        <Button
                          variant="primary"
                          onClick={() => pulsarSeguirONo(elem.user_id)}
                        >
                          {followingUsers.includes(elem.user_id)
                            ? "Siguiendo"
                            : "Seguir"}
                        </Button>
                      ) : null}
                      <Button
                        onClick={() =>
                          navigate(`/traderprofile/${elem.user_id}`)
                        }
                      >
                        Ver más
                      </Button>
                    </div>
                  </div>
                  {/* Seguidores: {elem.followers_count}
                    Siguiendo: {elem.following_count}
                    Cursos publicados: {elem.total_courses}
                    Post publicados: {elem.total_posts}
                    Trades Acertados: {elem.correct_posts}
                    Trades Errados: {elem.incorrect_posts} */}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
