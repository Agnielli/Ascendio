import axios from "axios";
import React from "react";
import { Button, Card } from "react-bootstrap";

export const DisabledCourses = ({ elem, setUpdateCourses }) => {
  const enableOneCourse = (id) => {
    axios
      .put(`http://localhost:3000/admin/enableonecourse/${id}`)
      .then((res) => {
        console.log(res);
        setUpdateCourses(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Img
          variant="top"
          src={`http://localhost:3000/images/cursos/${elem.img}`}
        />
        <Card.Title>Nombre: {elem.title}</Card.Title>
        <Card.Text>Descripción: {elem.description}</Card.Text>
        <Button onClick={() => enableOneCourse(elem.course_id)}>
          Activar Curso
        </Button>
      </Card.Body>
    </Card>
  );
};
