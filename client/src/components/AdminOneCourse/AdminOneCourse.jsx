import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import "./adminOneCourse.scss";

export const AdminOneCourse = ({ elem, updateCourses, setUpdateCourses }) => {
  const disableEnableCourse = (course_id, is_disabled) => {
    let url;
    if (is_disabled === 1) {
      url = `http://localhost:3000/admin/adminenableonecourse/${course_id}`;
    }
    if (is_disabled === 0) {
      url = `http://localhost:3000/admin/admindisableonecourse/${course_id}`;
    }
    axios
      .put(url)
      .then((res) => {
        setUpdateCourses(!updateCourses);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Col xs={12} md={6} lg={4} xxl={3} className="d-flex">
      <Card
        style={{ width: "100%" }}
        className="mapeoAllCourse text-center mb-4"
      >
        <Card.Img
          style={{ height: "16rem", objectFit: "cover" }}
          variant="top"
          src={`http://localhost:3000/images/cursos/${elem.course_img}`}
        />
        <Card.Body className="d-flex flex-column">
          <div>
            <Card.Title className="cardtitle">{elem.title}</Card.Title>
            <Card.Text className="descriptioncard">
              {elem.description}
            </Card.Text>
            <Card.Text className="cardtitle">Autor: {elem.nickname}</Card.Text>
          </div>
          <div className="mt-auto">
            <Button
              className="Button3"
              onClick={() =>
                disableEnableCourse(elem?.course_id, elem?.is_disabled)
              }
            >
              {elem.is_disabled ? "Activar" : "Desactivar"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
