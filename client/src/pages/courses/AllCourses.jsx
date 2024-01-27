import React, { useContext, useEffect, useState } from "react";
import "./courses.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { AscendioContext } from "../../context/AscendioContext";
import { textSensitive } from "../../helpers/utils";
import { RatingStars } from "../../components/Courses/RatingStars/RatingStars";

export const AllCourses = () => {
  // const { user } = useContext(AscendioContext);
  const [allcourses, setAllcourses] = useState([]);
  const [findCourse, setFindCourse] = useState();
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    let url
    if(order === false){
      url = `http://localhost:3000/courses/callcourses`
    }else{
      url = `http://localhost:3000/courses/callcoursesdates`
    }
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
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
    <section>
      <div className="d-flex justify-content-center p-5">
        <h2>All courses</h2>
        <input onChange={handleChange} placeholder="🔍..." value={filter} />
      </div>

      <div className="d-flex justify-content-center" style={{color: 'white'}}><h2>{order ? "Ver Últimos Cursos" : "Top Cursos"}</h2></div>
      <div className="d-flex justify-content-end">
        
        <Button
            onClick={() => setOrder(!order)}
            variant="outline-success"
            className="me-5 mb-3"
          >
          {order ? "Ver Top Cursos" : "Ver Últimos Cursos"}
        </Button>
      </div>
      <article className="d-flex justify-content-center gap-2 flex-wrap">
        
        {findCourse?.map((elem) => {
          return (
            <Card style={{ width: "22rem" }} key={elem.course_id}>
              <Card.Img
                style={{ height: "22rem", objectFit: "cover" }}
                variant="top"
                src={`http://localhost:3000/images/cursos/${elem.img}`}
              />
              <Card.Body>
                <Card.Title> {elem.title} </Card.Title>
                <Card.Subtitle>Seguidores: {elem.followers}</Card.Subtitle>
                
                {elem.average_rating&&
                  <RatingStars 
                    numberstars={elem.average_rating}
                />}
                
                <Card.Subtitle>{elem.tags}</Card.Subtitle>
                <Card.Text>{elem.description}</Card.Text>
                <Card.Text>{elem.price === 0 ?'GRATIS' : `${elem.price}€`}</Card.Text>
                <Button
                  onClick={() => navigate(`/course/${elem.course_id}`)}
                  variant="outline-success"
                  className="me-3"
                >
                  Más info
                </Button>
              </Card.Body>
            </Card>
          );
        })}
        {findCourse?.length === 0 && (
          <p>No se han encontrado cursos con este nombre</p>
        )}
      </article>
    </section>
  );
};
