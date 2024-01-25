import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AscendioContext } from "../../../context/AscendioContext";
import { Button, Card, InputGroup, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

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
          console.log(res);
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

  console.log(options);

  return (
    <div>
      {show === 1 && (
        <>
          <div className="d-flex gap-1">
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
          <h2>Top Usuarios con más Seguidores</h2>
          <div className="d-flex flex-wrap gap-2">
            {allUsersFilter?.map((elem) => {
              return (
                <Card
                  style={{ width: "18rem", marginBottom: "1rem" }}
                  key={elem.user_id}
                >
                  <Card.Body>
                    <div>                     
                        <div className="avatar">
                          {elem.img !== null ? (
                            <Card.Img
                              variant="top"
                              src={`http://localhost:3000/images/users/${elem.img}`}
                            />
                          ) : (
                            <p>{elem?.nickname.charAt(0).toUpperCase()}</p>
                          )}
                        </div>                    
                      <Card.Title className="d-flex">                      
                          <h3> {elem.nickname}</h3>                        
                      </Card.Title>
                      {user.user_id !== elem.user_id ? (
                        <Button
                          variant="primary"
                          onClick={() => pulsarSeguirONo(elem.user_id)}
                        >
                          {followingUsers.includes(elem.user_id)
                            ? "Siguiendo"
                            : "Seguir"}
                        </Button>
                      ) : (
                        <Button onClick={() => navigate(`/profile`)}>
                          Ir a mi perfil
                        </Button>
                      )}
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item></ListGroup.Item>
                          <ListGroup.Item>
                            Seguidores: {elem.followers_count}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Siguiendo: {elem.following_count}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Cursos publicados: {elem.total_courses}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Post publicados: {elem.total_posts}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Trades Acertados: {elem.correct_posts}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Trades Errados: {elem.incorrect_posts}
                          </ListGroup.Item>
                          <ListGroup.Item></ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                      <div className="d-flex gap-1">
                        <Button
                          onClick={() =>
                            navigate(`/traderprofile/${elem.user_id}`)
                          }
                        >
                          Ver más
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </>
      )}
      {show === 2 && (
        <>
          <div className="d-flex gap-1">
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
          <h2>Top Usuarios con más Aciertos</h2>
          <div className="d-flex flex-wrap gap-2">
            {allUsersFilter?.map((elem) => {
              return (
                <Card
                  style={{ width: "18rem", marginBottom: "1rem" }}
                  key={elem.user_id}
                >
                  <Card.Body>
                    <div>
                      <Card.Title className="d-flex">
                        <h3>Usuario: {elem.nickname}</h3>
                      </Card.Title>
                      {user.user_id !== elem.user_id ? (
                        <Button
                          variant="primary"
                          onClick={() => pulsarSeguirONo(elem.user_id)}
                        >
                          {followingUsers.includes(elem.user_id)
                            ? "Siguiendo"
                            : "Seguir"}
                        </Button>
                      ) : (
                        <Button onClick={() => navigate(`/profile`)}>
                          Ir a mi perfil
                        </Button>
                      )}
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item></ListGroup.Item>
                          <ListGroup.Item>
                            Seguidores: {elem.followers_count}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Siguiendo: {elem.following_count}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Cursos publicados: {elem.total_courses}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Post publicados: {elem.total_posts}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Trades Acertados: {elem.correct_posts}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Trades Errados: {elem.incorrect_posts}
                          </ListGroup.Item>
                          <ListGroup.Item></ListGroup.Item>
                        </ListGroup>
                        {elem.image_name !== null && (
                          <Card.Img
                            variant="top"
                            src={`http://localhost:3000/images/users/${elem.img}`}
                          />
                        )}
                      </Card.Body>
                      <div className="d-flex gap-1">
                        <Button
                          onClick={() =>
                            navigate(`/traderprofile/${elem.user_id}`)
                          }
                        >
                          Ver más
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
