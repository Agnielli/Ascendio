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
          className="d-flex justify-content-between align-items-center p-5"
          style={{ color: "white" }}
        >
          <div>
            <h2>{order ? "Últimos cursos" : "Top cursos"}</h2>
            <Button onClick={() => setOrder(!order)} className="Button3">
              {order ? "Ver top cursos" : "Ver últimos cursos"}
            </Button>
          </div>
          <div>
            <input
            onChange={handleChange} placeholder="🔍"
            value={filter}
            className="buscador"
            />
          </div>
        </div>
      </header>
      <main className="mainAllCourses pb-5">
        <Row> 
        
        {findCourse?.map((elem) => {
          return (
            <Col xs={12} sm={6} lg={5} > 
            <Card
              key={elem.course_id}
              className="mapeoAllCourse text-center"
            >
              <Card.Img
                style={{ height: "16rem", objectFit: "cover" }}
                variant="top"
                src={`http://localhost:3000/images/cursos/${elem.img}`}
              />
              <Card.Body className="d-flex flex-column gap-1">
                <Card.Text> {elem.title} </Card.Text>
                <Card.Subtitle className="followerscard">Seguidores: {elem.followers}</Card.Subtitle>

                {elem.average_rating && (
                  <RatingStars numberstars={elem.average_rating} />
                )}

                <Card.Subtitle className="tagsCourse">
                  {elem.tags}
                </Card.Subtitle>
                <Card.Title className="descriptioncard">{elem.description}</Card.Title>
                <Card.Text>
                  {elem.price === 0 ? "GRATIS" : `${elem.price}€`}
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
        </Row>
        {findCourse?.length === 0 && (
          <p className="busqueda">
            No se han encontrado cursos con este nombre
          </p>
        )}
      </main>
    </Col>
  );
};
