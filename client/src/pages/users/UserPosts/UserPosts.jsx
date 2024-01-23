import React, { Children, useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, ListGroup } from "react-bootstrap";
import { AllPosts } from "./AllPosts/AllPosts";
import { AllGeneralPosts } from "./AllGeneralPosts/AllGeneralPosts";
import { AllTradePosts } from "./AllTradePosts/AllTradePosts";

export const UserPosts = () => {
  const [posts, setPosts] = useState();
  const { user } = useContext(AscendioContext);
  const navigate = useNavigate();
  const [markTrade, setMarkTrade] = useState(false);
  const [showFilter, setShowFilter] = useState(0);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/users/postsuser/${user.user_id}`)
        .then((res) => {
          setPosts(res.data.datos);
          if (markTrade) {
            setMarkTrade(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, markTrade]);

  if (posts) {
    console.log(posts);
  }

  const markACorrect = (post_id, correct) => {
    if (posts) {
      axios
        .put(`http://localhost:3000/posts/markatrade/${post_id}`, {
          correct,
          mark: 1,
        })
        .then((res) => {
          setMarkTrade(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const markAIncorrect = (post_id, correct) => {
    if (posts) {
      axios
        .put(`http://localhost:3000/posts/markatrade/${post_id}`, {
          correct,
          mark: 0,
        })
        .then((res) => {
          setMarkTrade(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const markAPending = (post_id, correct) => {
    if (posts) {
      axios
        .put(`http://localhost:3000/posts/markatrade/${post_id}`, {
          correct,
          mark: null,
        })
        .then((res) => {
          console.log(res);
          setMarkTrade(true);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div className="d-flex p-5 gap-5">
        <h2>Mis Posts</h2>
        <Button onClick={() => navigate("/profile")}>Volver</Button>
      </div>
      <div className="d-flex gap-5 ps-5 pe-5 mb-1">
        <Button
          variant={showFilter === 0 ? "danger" : "primary"}
          onClick={() => {
            setShowFilter(0);
          }}
        >
          Todos
        </Button>
        <Button
          variant={showFilter === 2 ? "danger" : "primary"}
          onClick={() => setShowFilter(2)}
        >
          Trades
        </Button>
        <Button
          variant={showFilter === 1 ? "danger" : "primary"}
          onClick={() => setShowFilter(1)}
        >
          Generales
        </Button>
      </div>
      {showFilter === 0 && (
        <AllPosts
          posts={posts}
          markACorrect={markACorrect}
          markAIncorrect={markAIncorrect}
          markAPending={markAPending}
        />
      )}
      {showFilter === 1 && (
        <AllGeneralPosts
          posts={posts}
          markACorrect={markACorrect}
          markAIncorrect={markAIncorrect}
          markAPending={markAPending}
        />
      )}
      {showFilter === 2 && (
        <AllTradePosts
          posts={posts}
          markACorrect={markACorrect}
          markAIncorrect={markAIncorrect}
          markAPending={markAPending}
        />
      )}
    </>
  );
};
