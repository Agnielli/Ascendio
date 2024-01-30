import axios from "axios";
import React from "react";
import { Button, Card, Col } from "react-bootstrap";

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

  return (
    <Col xs={12} md={6} lg={4} xxl={3}>
      <Card
        // style={{ width: "18rem" }}
        className="mapeoAllCourse text-center mb-4"
      >
        <Card.Body>
          <Card.Img
            variant="top"
            src={`http://localhost:3000/images/cursos/${elem.img}`}
          />
          <Card.Title className="cardtitle">Nombre: {elem.title}</Card.Title>
          <Card.Text className="d-flex justify-content-start descriptioncard">
            Descripción: {elem.description}
          </Card.Text>
          <Card.Text className="d-flex justify-content-center mt-auto">
            <Button
              className="Button3"
              onClick={() => disableOneCourse(elem.course_id)}
            >
              Desactivar Curso
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
