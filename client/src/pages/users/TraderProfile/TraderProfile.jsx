import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { OneUserAllPosts } from "./OneUserAllPosts/OneUserAllposts";

export const TraderProfile = () => {
  const [traderprofile, setTraderprofile] = useState();
  const [tarderPosts, setTraderPosts] = useState();
  const [showPosts, setShowPosts] = useState(false);
  const { user_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user_id);
    axios
      .get(`http://localhost:3000/users/traderprofile/${user_id}`)
      .then((res) => {
        console.log("datos del usuario", res.data);
        setTraderprofile(res.data[0]);
        setTraderPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleShowPost = () => {
    setShowPosts(!showPosts);
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header className="d-flex justify-content-center gap-2">
          <div className="avatar">
            {traderprofile?.user_image ? (
              <img src={`http://localhost:3000/images/users/${traderprofile.user_image}`} />
            ) : (
              <p>{traderprofile?.nickname.charAt(0).toUpperCase()}</p>
            )}
          </div>{" "}
          <h2>{traderprofile?.nickname}</h2>
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <div>
            <Card.Text>
              Nombre: {traderprofile?.name + " " + traderprofile?.lastname}
            </Card.Text>
          </div>
          <div className="d-flex gap-1 justify-content-center">
            <Card.Text className="col-4">
              Post creados: {traderprofile?.total_posts}
            </Card.Text>
            <Card.Text className="col-4">
              Posts correctos: {traderprofile?.correct_posts_count}
            </Card.Text>
            <Card.Text className="col-4">
              Posts incorrectos: {traderprofile?.incorrect_posts_count}
            </Card.Text>
          </div>
          <div className="d-flex gap-1 justify-content-center">
            <Card.Text className="col-4">
              Cursos creados: {traderprofile?.total_courses}
            </Card.Text>
            <Card.Text className="col-4">
              Seguidores: {traderprofile?.followers_count}
            </Card.Text>
            <Card.Text className="col-4">
              Siguiendo: {traderprofile?.following_count}
            </Card.Text>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted d-flex gap-5 justify-content-center">
          <Button variant="primary" onClick={handleShowPost}>
            Mostrar Posts
          </Button>
          <Button variant="primary">
            Mostrar Cursos
          </Button>
          <Button variant="primary" onClick={() => navigate("/showallusers")}>
            Volver
          </Button>
        </Card.Footer>
      </Card>
      <div>
        {showPosts && (
          <OneUserAllPosts
            user_id={user_id}
            showPost={showPosts}
            setShowPost={setShowPosts}
          />
        )}
      </div>

      {/* {tarderPosts?.map((elem, index) => {
        return <OneUserAllPosts key={index} elem={elem} />;
      })}
      <div>
        <Button
          className="mt-5"
          variant="primary"
          onClick={() => navigate("/showallusers")}
        >
          Volver
        </Button>
      </div> */}
    </>
  );
};
