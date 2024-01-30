import React, { useContext, useEffect, useState } from "react";
import "./saveCourseCard.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { textSensitive } from "../../../helpers/utils";
import { RatingStars } from "../RatingStars/RatingStars";
import { AscendioContext } from "../../../context/AscendioContext";
import "../../../../public/stylesheets/ButtonsApp.scss";

export const SaveCourseCard = () => {
  const [allcourses, setAllcourses] = useState([]);
  const [findCourse, setFindCourse] = useState();
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState(false);
  const { user_id } = useContext(AscendioContext).user;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/getonewishedcourse/${user_id}`)
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
      <header className="headerCursosGuardados">
        <div
          className="d-flex justify-content-between p-5 divHeader"
          style={{ color: "white" }}
        >
          <h2 className="text-center" >Mis cursos guardados</h2>
          <input onChange={handleChange} placeholder="🔍..." value={filter} className="buscador" />
        </div>
      </header>
      <main className="mainCursosGuardados gap-3 pb-5">
      <Row className="justify-content-center"> 
        {findCourse?.map((elem) => {
          return (
            <Col xs={12} md={6} lg={4} xxl={3} className="d-flex"> {/* Añade la clase 'd-flex' */}
            <Card
              key={elem.course_id}
              className="mapeoCursosGuardados text-center mb-4" 
              style={{ width: "100%" }}> {/* Añade la el ancho para que se adapte bien */}
              <Card.Img
                style={{ height: "16rem", objectFit: "cover" }}
                variant="top"
                src={`http://localhost:3000/images/cursos/${elem.img}`}
              />
              <Card.Body className="d-flex flex-column gap-1 flex-fill">
                <Card.Text className="cardtitle"> {elem.title} </Card.Text>
                <Card.Subtitle className="followerscard">
                  {elem?.followers !== 0
                  ? `${elem?.followers} Seguidores`
                  : "Sin seguidores"}
                </Card.Subtitle>

                {elem.average_rating && (
                  <RatingStars numberstars={elem.average_rating} />
                )}

                <Card.Subtitle className="tagsCourse">{elem.tags}</Card.Subtitle>
                <Card.Title className="descriptioncard d-flex justify-content-start mt-auto">{elem.description}</Card.Title>
                <Card.Text>
                <Card.Text className="priceCourse cardtitle px-3 my-2">
                  {Number(elem?.price) === 0
                  ? "GRATIS"
                  : `${elem?.price}€`}
              </Card.Text>
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
        </Row>
        {findCourse?.length === 0 && (
          <p>No existen cursos</p>
        )}
        
      </main>
    </Col>
  );
};
