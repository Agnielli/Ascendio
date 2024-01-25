import axios from "axios";
import React from "react";
import { Button, Card } from "react-bootstrap";

export const EnabledCourses = ({ elem, setUpdateCourses }) => {
  const disableOneCourse = (id) => {
    axios
      .put(`http://localhost:3000/admin/disableonecourse/${id}`)
      .then((res) => {
        console.log(res);
        setUpdateCourses(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(elem)

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Img
          variant="top"
          src={`http://localhost:3000/images/cursos/${elem.img}`}
        />
        <Card.Title>Nombre: {elem.title}</Card.Title>
        <Card.Text>Descripción: {elem.description}</Card.Text>
        <Button onClick={() => disableOneCourse(elem.course_id)}>
          Desactivar Curso
        </Button>
      </Card.Body>
    </Card>
  );
};
