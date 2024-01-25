import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { AscendioContext } from '../../../context/AscendioContext';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

  const [lastTrades, setLastTrades] = useState([]);
  const { user } = useContext(AscendioContext);
  const [followingUsers, setFollowingUsers] = useState([]); // Nuevo estado para almacenar usuarios seguidos

  const navigate = useNavigate();

  // para obtener los posts (generales y trades) ordenados por fecha de subida (últimos trades)
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/lasttrades")
      .then((res) => {
        // console.log(res.data);
        setLastTrades(res.data);
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
    }, []);

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


  return (
    <div>
    <>
      <h2>Últimos Posts</h2>
      <div className="d-flex flex-wrap gap-2 mb-2">
        {lastTrades.map((elem, index) => {
            return (
              <Card
                style={{ width: "18rem", marginBottom: "1rem" }}
                key={elem.post_id}
              >
                {/* Posts */}
                {elem.type === 1 &&
                  <Card.Body>
                  <div>
                    <Card.Title className="d-flex">
                      <h3>Trader: {elem.nickname}</h3>
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
                      <Button
                        onClick={() =>
                          navigate(`/userposts/${user.user_id}`)
                        }
                      >
                        Ir a posts
                      </Button>
                    )}
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item></ListGroup.Item>
                        <ListGroup.Item>{elem.description}</ListGroup.Item>
                        <ListGroup.Item></ListGroup.Item>
                      </ListGroup>
                      {elem.image_name !== null && (
                        <Card.Img
                          variant="top"
                          src={`http://localhost:3000/images/generalPost/${elem.image_name}`}
                        />
                      )}
                    </Card.Body>
                  </div>
                </Card.Body>
                }
                {/* Trades */}
                {elem.type === 2 &&
                  <Card.Body>
                  <div>
                    <Card.Title className="d-flex">
                      <h3>Trader: {elem.nickname}</h3>
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
                      <Button
                        onClick={() => navigate(`/userposts/${user.user_id}`)}
                      >
                        Ir a posts
                      </Button>
                    )}
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item></ListGroup.Item>
                        <ListGroup.Item>
                          Currency: {elem.currency}
                        </ListGroup.Item>
                        <ListGroup.Item className="mb-1">
                          Estado: {elem.correct === null && "Trade Pendiente"}
                          {elem.correct === 0 && "Trade Errado"}
                          {elem.correct === 1 && "Trade Acertado"}
                        </ListGroup.Item>{" "}
                        <ListGroup.Item></ListGroup.Item>
                      </ListGroup>
                      {elem.image_name !== null && (
                        <Card.Img
                          variant="top"
                          src={`http://localhost:3000/images/trades/${elem.image_name}`}
                        />
                      )}
                    </Card.Body>
                    <div className="d-flex gap-1">
                      <Button onClick={()=>{navigate(`/OneTradePost/${elem.post_id}`)}}>Ver más</Button>
                    </div>
                  </div>
                  </Card.Body>
                }
              </Card>
            );
          })}
      </div>
    </>
  </div>
  )
}
