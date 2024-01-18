import React, { useEffect, useState } from "react";
import "./purchaseCourse.scss";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PurchaseCourseCard } from "../../../components/Courses/PurchaseCourseCard/PurchaseCourseCard";
import axios from "axios";

export const PurchaseCourse = () => {
  const [cursosComprados, setCursosComprados] = useState();
  const navigate = useNavigate();

  //llamo a todos los cursos que tengo adquirido cuando entro en el perfil-cursos comprodaos
  useEffect(() => {
    axios
      .get("http://localhost:3000/courses/viewpurchasedcourse")
      .then((res) => {
        console.log(res.data);
        setCursosComprados(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Button onClick={() => navigate("/profile")}>Volver</Button>
      <h3>Mis cursos comprados</h3>

      {cursosComprados?.map((elem) => (
        <Card style={{ width: '18rem' }} key={elem.course_id}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{elem.title}</Card.Title>
            <Card.Text>{elem.description}</Card.Text>
            <Button variant="primary">??</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
