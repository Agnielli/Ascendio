import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AllGeneralPosts.scss";

export const AllGeneralPosts = ({
  posts,
  markACorrect,
  markAIncorrect,
  markAPending,
}) => {
  const navigate = useNavigate();
  return (
    <div className="ALLGeneralPostsScss d-flex flex-wrap ">
      {posts
        ?.filter((post) => post.type === 1)
        .map((elem) => {
          return (
            <Card className="ESTILOCARD" key={elem.post_id}>
              {elem.resource_text !== null ? (
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/images/generalPost/${elem.resource_text}`}
                />
              ) : <Card.Img
            
              variant="top"
              src={"../../../../../public/images/trade/trades.png"}
            />}
              <Card.Body>
                <Card.Title>Categoría: {elem.category_name}</Card.Title>
                <Card.Text>Descripción: {elem.description}</Card.Text>
                <Button
                    onClick={() => {
                      navigate(`/oneGeneralPost/${elem.post_id}`);
                    }}
                  >
                    Ir a comentarios del post
                  </Button>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
};
