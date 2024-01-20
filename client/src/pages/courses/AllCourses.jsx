import React, { useContext, useEffect, useState } from 'react';
import './courses.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { AscendioContext } from '../../context/AscendioContext';
export const AllCourses = () => {
  const { user } = useContext(AscendioContext);
  const [allcourses, setAllcourses] = useState([]);
  const [guardado, setGuardado] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/callcourses`)
      .then((res) => {
        console.log(res.data);
        setAllcourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const guardar = (courseId) => {
    setGuardado((prevGuardado) => ({
      ...prevGuardado,
      [courseId]: !prevGuardado[courseId],
    }));
  };
  return (
    <div>
      <h1>ALL courses</h1>
      <p> TODO: mapeo y Use Effect -array de dependencia con comprado- con todos los cursos</p>
      {allcourses?.map((elem) => {
        return (
          <Card style={{ width: '22rem' }} key={elem.course_id}>
            <Card.Img variant="top" src={`http://localhost:3000/images/cursos/${elem.img}`} />
            <Card.Body>
              <Card.Title> {elem.title} </Card.Title>
              <Card.Subtitle>{elem.tags}</Card.Subtitle>
              <Card.Text>{elem.description}</Card.Text>
              <Card.Text>{elem.price}€</Card.Text>
              <Button onClick={() => comprarCurso(elem.course_id)} variant="outline-success" className="me-3">
                Comprar
              </Button>
              {guardado[elem.course_id] ? (
                <Button onClick={() => guardar(elem.course_id)} variant="outline-success" className="me-3">
                  Quitar de favoritos
                </Button>
              ) : (
                <Button onClick={() => guardar(elem.course_id)} variant="outline-success" className="me-3">
                  Guardar entre favoritos
                </Button>
              )}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};