import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { AscendioContext } from "../../../../context/AscendioContext";
import { Link, useNavigate } from "react-router-dom";
import './allPostGenerals.scss';

export const AllPostsGenerals = () => {
  const [lastTrades, setLastTrades] = useState([]); // para enseñar: ULTIMOS TRADES o TOP SEGUIDORES o TOP ACERTADOS
  const [lastTradesFilter, setLastTradesFilter] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(AscendioContext);
  const [followingUsers, setFollowingUsers] = useState([]); // Nuevo estado para almacenar usuarios seguidos
  const navigate = useNavigate();

  // para obtener los trades ordenados por fecha de subida (últimos trades)
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/lasttrades")
      .then((res) => {
        // console.log(res.data);
        setLastTrades(res.data.filter((elem) => elem.type === 1));
        setLastTradesFilter(res.data.filter((elem) => elem.type === 1));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      setLastTradesFilter(
        lastTrades.filter((patata) =>
          patata.description.toLowerCase().includes(searchFilter.toLowerCase())
        )
      );
    } else {
      setLastTradesFilter(lastTrades);
    }
  };

  return (
    <div className="allpostgenerals">
      <>
      <Row className="general title-input">
        <Col lg={3} className="d-flex justify-content-center align-items-center">
          <h2>General Posts</h2>
        </Col>
        <Col lg={9} className="d-flex justify-content-center align-items-center">
            <input onChange={handleChange} placeholder="🔍 Buscar Trades" value={search} />
        </Col>
      </Row>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {lastTradesFilter.map((elem, index) => {
            return (
              <Card
                className="generalpost"
                style={{ width: "18rem", marginBottom: "1rem" }}
                key={elem.post_id}
              >
               <Row>
                    <Col lg={3} md={12} className="col1 d-flex flex-column align-items-center justify-content-center gap-2 mb-1">
                        <div className="avatar">
                              {elem?.img_name ? ( // modificar el elem.im_name
                                <img
                                  src={`http://localhost:3000/images/users/${user.img}`}
                                />
                                ) : (
                                  <p>{elem?.nickname.charAt(0).toUpperCase()}</p>
                              )}
                        </div>
                        <Card.Title className="d-flex">
                          <h3>{elem.nickname}</h3>
                        </Card.Title>
                        <p>{elem.num_followers} seguidores</p>
                        <div className="d-flex gap-2">
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
                              <Button
                                onClick={() => navigate(`/userposts/${user.user_id}`)}
                              >
                                Ir a posts
                              </Button>
                            )}
                            <Button
                              onClick={() => {
                                navigate(`/onegeneralpost/${elem.post_id}`);
                              }}
                            >
                              Ver más
                            </Button>
                        </div>
                    </Col>
                      {elem.image_name && 
                      <>
                        <Col lg={5} md={12} className="col2 d-flex flex-column align-items-center justify-content-center gap-2 mb-1">
                        {elem.image_name !== null && (
                            <Card.Img
                              variant="top"
                              src={`http://localhost:3000/images/generalPost/${elem.image_name}`}
                            />
                        )}
                        </Col>
                        <Col lg={4} md={12} className="col3 d-flex flex-column align-items-center justify-content-center gap-2 mb-1">
                        <p>{elem.description}</p>
                        </Col>
                      </>
                      } 
                      {elem.image_name == null && 
                        <Col lg={9} md={12} className="col3 d-flex flex-column align-items-center justify-content-center gap-2 mb-1">
                          <p>{elem.description}</p>
                        </Col>
                      }
                </Row> 
              </Card>
            );
          })}
        </div>
      </>
    </div>
  );
};
