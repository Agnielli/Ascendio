import React, { useEffect, useState } from "react";
import "./courses.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { textSensitive } from "../../helpers/utils";
import { RatingStars } from "../../components/Courses/RatingStars/RatingStars";
import "../../../public/stylesheets/ButtonsApp.scss";
export const AllCourses = () => {
  const [allcourses, setAllcourses] = useState([]);
  const [findCourse, setFindCourse] = useState();
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let url;
    if (order === false) {
      url = `http://localhost:3000/courses/callcourses`;
    } else {
      url = `http://localhost:3000/courses/callcoursesdates`;
    }
    axios
      .get(url)
      .then((res) => {
        setAllcourses(res.data);
        setFindCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [order]);
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
      <header className="headerAllCourses">
        <div
          className="d-flex justify-content-between align-items-center py-5 divHeader"
          style={{ color: "white" }}
        >
          <div>
            <h2>{order ? "Últimos cursos" : "Top cursos"}</h2>
            <Button onClick={() => setOrder(!order)} className="Button3">
              {order ? "Ver top cursos" : "Ver últimos cursos"}
            </Button>
          </div>
          <div className="input-container">
            <span className="material-symbols-outlined search-icon">
              search
            </span>
            <input
              onChange={handleChange}
              placeholder="Buscar"
              value={filter}
              className="buscador"
            />
          </div>
        </div>
      </header>
      <main className="mainAllCourses gap-3 pb-5">
      <Row className="justify-content-center">
        {findCourse?.map((elem) => {
          return (
            <Col xs={12} md={6} lg={4} xxl={3} className="d-flex">
            <Card
              // style={{ width: "22rem" }}
              key={elem.course_id}
              className="mapeoAllCourse text-center mb-4"
              style={{ width: "100%" }}
            >
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
                <Card.Subtitle className="tagsCourse">
                  {elem.tags}
                </Card.Subtitle>
                <Card.Title className="descriptioncard d-flex justify-content-start flex-grow-1">{elem.description}</Card.Title>
                <Card.Text className="priceCourse cardtitle px-3 my-1">
                  {Number(elem?.price) === 0
                  ? "GRATIS"
                  : `${elem?.price}€`}
              </Card.Text>
                <Card.Text className="d-flex justify-content-center mt-auto">
                  <Button
                    className="Button3"
                    onClick={() => navigate(`/course/${elem.course_id}`)}
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
          <p className="busqueda">
            No se han encontrado cursos con este nombre
          </p>
        )}
        </Row>
      </main>
    </Col>
  );
};