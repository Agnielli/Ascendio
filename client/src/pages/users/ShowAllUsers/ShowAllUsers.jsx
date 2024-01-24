import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AscendioContext } from "../../../context/AscendioContext";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ShowAllUsers = () => {
  const [show, setShow] = useState(1);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState();
  const { user } = useContext(AscendioContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/showallusers`)
      .then((res) => {
        console.log(res);
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [followingUsers, user]);
  

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

  console.log(user)

  return (
    <div>
      <h1 className="mb-2 mt-2">Todos los usuarios de Ascendio</h1>
      <div className="d-flex flex-wrap gap-2">
        {allUsers
          ?.filter((elem) => elem.type === 2)
          .map((elem) => {
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
                      <Button onClick={() => navigate(`/traderprofile/${elem.user_id}`)}>Ver más</Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        {show === 2 && (
          <>
            <Button onClick={() => setShow(1)}>Últimos Trades</Button>
            <Button onClick={() => setShow(3)}>Top Acertados</Button>

            <h1>Top Seguidores</h1>
          </>
        )}
        {show === 3 && (
          <>
            <Button onClick={() => setShow(1)}>Últimos Trades</Button>
            <Button onClick={() => setShow(2)}>Top Seguidores</Button>

            <h1>Top Acertados</h1>
          </>
        )}
      </div>
    </div>
  );
};
