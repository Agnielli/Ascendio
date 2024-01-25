import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const UserFollowing = () => {
  const [following, setFollowing] = useState([]);
  const [followingFilter, setFollowingFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [followingUsers, setFollowingUsers] = useState([]); // Nuevo estado para almacenar usuarios seguidos
  const { user } = useContext(AscendioContext);
  const navigate = useNavigate();

  // para obtener los usuarios que nos siguen
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/users/followingsuser/${user.user_id}`)
        .then((res) => {
          console.log(res);
          setFollowing(res.data.datos);
          setFollowingFilter(res.data.datos)
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
      setFollowingFilter(
        following.filter((patata) =>
          patata.nickname.toLowerCase().includes(searchFilter.toLowerCase())
        )
      );
    } else {
      setFollowingFilter(followers);
    }
  };

  return (
    <>
      <div className="d-flex flex-column p-5">
        <div className="d-flex  gap-5">
          <h2>Siguiendo a:</h2>
          <Button onClick={() => navigate("/profile")}>Volver</Button>
        </div>
        <div className="d-flex  gap-5">
          <input onChange={handleChange} placeholder="🔍..." value={search} />
        </div>
      </div>
      <div className="d-flex gap-5 flex-wrap p-5">
        {followingFilter?.map((elem) => {
          return (
            <Card style={{ width: "18rem" }} key={elem.user_id}>
              {elem.img !== null ? (
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/images/users/${elem.img}`}
                />
              ) : (
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/images/users/descarga.png`}
                />
              )}

              <Card.Body>
                <Card.Title>{elem.nickname}</Card.Title>
                <Card.Text></Card.Text>
                {user.user_id !== elem.user_id ? (
                  <Button
                    variant="primary"
                    onClick={() => pulsarSeguirONo(elem.user_id)}
                  >
                    {followingUsers.includes(elem.user_id)
                      ? "Dejar de Seguir"
                      : "Seguir"}
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate(`/userposts/${user.user_id}`)}
                  >
                    Ir a posts
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};
