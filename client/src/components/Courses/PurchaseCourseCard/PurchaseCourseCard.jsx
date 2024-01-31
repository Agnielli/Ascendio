import React, { useContext, useEffect, useState } from "react";
import "./purchaseCourseCard.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { textSensitive } from "../../../helpers/utils";
import { RatingStars } from "../RatingStars/RatingStars";
import { AscendioContext } from "../../../context/AscendioContext";
import "../../../../public/stylesheets/ButtonsApp.scss";


export const PurchaseCourseCard = () => {
  const [allcourses, setAllcourses] = useState([]);
  const [findCourse, setFindCourse] = useState();
  const [filter, setFilter] = useState("");
  const { user_id } = useContext(AscendioContext).user;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/getonepurchasedcourse/${user_id}`)
      .then((res) => {
        setAllcourses(res.data);
        setFindCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const tempArray = allcourses.filter((e) => {
      return textSensitive(e.title, filter);
    });
    setFindCourse(tempArray);
  }, [allcourses, filter]);

  return (
    <Col>
      <header className="headerCursosComprados">
        <div
          className="d-flex justify-content-between divHeader p-5"
          style={{ color: "white" }}
        >
          <h2 className="text-center">Mis cursos comprados</h2>
          <input onChange={handleChange} placeholder="🔍..." value={filter} className="buscador"/>
        </div>
      </header>
      <main className="mainCursosComprados gap-3 pb-5">
      <Row className="justify-content-center">
        {findCourse?.map((elem) => {
          return (
            <Col xs={12} md={6} lg={4} xxl={3} className="d-flex">
            <Card
              key={elem.course_id}
              className="mapeoCursosComprados text-center mb-4"
              style={{ width: "100%" }}>
              <Card.Img
                style={{ height: "16rem", objectFit: "cover" }}
                variant="top"
                src={`http://localhost:3000/images/cursos/${elem.img}`}
              />
              <Card.Body className="d-flex flex-column gap-1">
                <Card.Text className="cardtitle"> {elem.title} </Card.Text>

                {elem.average_rating && (
                  <RatingStars numberstars={elem.average_rating} />
                )}

                <Card.Subtitle className="tagsCourse">{elem.tags}</Card.Subtitle>
                <Card.Title className="descriptioncard d-flex justify-content-start">{elem.description}</Card.Title>

                <Card.Text className="priceCourse cardtitle px-3 my-2">
                  {Number(elem?.price) === 0
                  ? "GRATIS"
                  : `${elem?.price}€`}
              </Card.Text>
                <Card.Text className="d-flex justify-content-center mt-auto">
                  <Button
                    onClick={() => navigate(`/course/${elem.course_id}`)}
                    className="Button3"
                  >
                    Más info
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          );
        })}
        {findCourse?.length === 0 && (
          <h4 className="alltrades-error-nohaypostsnitrades text-center">
          No hay{" "}
          <span className="alltrades-error-nohaypostsnitrades-hijo">
            Cursos
          </span>{" "}
          disponibles en este momento.
        </h4>
        )}
        </Row>
      </main>
    </Col>
  );
};
