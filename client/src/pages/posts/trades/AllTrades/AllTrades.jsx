import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { AscendioContext } from "../../../../context/AscendioContext";
import { Link, useNavigate } from "react-router-dom";
import "./allTrades.scss";
import "../../../../../public/stylesheets/ButtonsApp.scss";
import "../../../../../public/stylesheets/ESTILOCARDGENERAL.scss";
// import '../../../../../public/stylesheets/FormulariosEInputs.scss';

export const AllTrades = () => {
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
        setLastTrades(res.data.filter((elem) => elem.type === 2));
        setLastTradesFilter(res.data.filter((elem) => elem.type === 2));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(lastTrades[0] === undefined);

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
    console.log(search);
    if (search !== "") {
      setLastTradesFilter(
        lastTrades.filter((patata) =>
          patata.currency.toLowerCase().includes(searchFilter.toLowerCase())
        )
      );
    } else {
      setLastTradesFilter(lastTrades);
    }
  };

  return (
    <div className="alltrades">
      <>
        <Row className="general-altradeposts title-input">
          <Col
            // lg={3}
            className="d-flex justify-content-center align-items-center"
          >
            <h2>Trade Posts</h2>
          </Col>
          <Col
            // lg={9}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="input-container">
              <span className="material-symbols-outlined search-icon">
                search
              </span>
              <input
                onChange={handleChange}
                placeholder="Buscar"
                value={search}
                className="buscador"
              />
            </div>
            {/* <input
              onChange={handleChange}
              placeholder="🔍 Buscar Trades"
              value={search}
            /> */}
          </Col>
        </Row>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {lastTradesFilter[0] !== undefined ? (
            lastTradesFilter.map((elem) => {
              return (
                <Card className="ESTILOCARDGENERAL" key={elem.post_id}>
                  <Card.Text className="UserCARD">
                    <div className="avatarCard">
                      {elem?.img ? (
                        <img
                          src={`http://localhost:3000/images/users/${elem.img}`}
                        />
                      ) : (
                        <p className="letteruser">
                          {elem?.nickname.charAt(0).toUpperCase()}
                        </p>
                      )}
                    </div>
                    <p>{elem.nickname}</p>
                  </Card.Text>

                  <div className="DivImagenCard">
                    {elem.image_name !== null ? (
                      <Card.Img
                        variant="top"
                        src={
                          elem.type === 1
                            ? `http://localhost:3000/images/generalPost/${elem.image_name}`
                            : `http://localhost:3000/images/trades/${elem.image_name}`
                        }
                        className="ascendio-home-card-imagen"
                      />
                    ) : (
                      <Card.Img
                        className="CardSinFoto"
                        variant="top"
                        src={
                          "../../../../public/images/iconos/logoascendio.png"
                        }
                      />
                    )}
                  </div>
                  <Card.Body>
                    <Card.Title>
                      <h3>Trade de {elem.category_name}</h3>
                    </Card.Title>

                    <div className="d-flex gap-2">
                      {
                        user.user_id !== elem.user_id ? (
                          <Button
                            className="ButtonSEGUIR"
                            variant="primary"
                            onClick={() => pulsarSeguirONo(elem.user_id)}
                          >
                            {followingUsers.includes(elem.user_id)
                              ? "Siguiendo"
                              : "Seguir"}
                          </Button>
                        ) : null
                        // <Button
                        //   onClick={() =>
                        //     navigate(`/userposts/${user.user_id}`)
                        //   }
                        // >
                        //   Ir a posts
                        // </Button>
                      }
                      <button
                        className="Button3 button-with-ellipsis"
                        onClick={() => {
                          navigate(`/OneTradePost/${elem.post_id}`);
                        }}
                      >
                        COMENTARIOS
                      </button>
                    </div>

                    <Card.Text>
                      {elem.currency !== null ? (
                        <p>
                          Currency: <span>{elem.currency}</span>
                        </p>
                      ) : null}
                      <p>
                        Descripción: <span>{elem.description}</span>
                      </p>
                      <p>
                        Precio de entrada: <span>{elem.entry_price}</span>
                      </p>
                      <p>
                        Precio de stop: <span>{elem.stop_loss}</span>
                      </p>
                      <p>
                        Precio Profit: <span>{elem.take_profit}</span>
                      </p>
                      <p>
                        Estado:{" "}
                        <span>
                          {elem.correct === null && "Trade Pendiente"}
                          {elem.correct === 0 && "Trade Errado"}
                          {elem.correct === 1 && "Trade Acertado"}
                        </span>
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <h4 className="alltrades-error-nohaypostsnitrades">
              No hay{" "}
              <span className="alltrades-error-nohaypostsnitrades-hijo">
                Trade Posts
              </span>{" "}
              disponibles en este momento.
            </h4>
          )}
        </div>
      </>
    </div>
  );
};
