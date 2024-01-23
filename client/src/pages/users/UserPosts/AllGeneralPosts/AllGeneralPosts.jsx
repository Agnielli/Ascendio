import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

export const AllGeneralPosts = ({
  posts,
  markACorrect,
  markAIncorrect,
  markAPending,
}) => {
  return (
    <div className="d-flex gap-5 flex-wrap pe-5 ps-5">
      {posts
        ?.filter((post) => post.type === 1)
        .map((elem) => {
          return (
            <Card style={{ width: "18rem" }} key={elem.post_id}>
              {elem.resource_text !== null ? (
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/images/trades/${elem.resource_text}`}
                />
              ) : null}
              <Card.Body>
                <Card.Title>Categoría: {elem.category_name}</Card.Title>
                <Card.Text>Descripción: {elem.description}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
};
