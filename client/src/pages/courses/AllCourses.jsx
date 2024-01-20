import React, { useContext, useEffect, useState } from 'react';
import './courses.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { AscendioContext } from '../../context/AscendioContext';
export const AllCourses = () => {
  // const { user } = useContext(AscendioContext);
  const [allcourses, setAllcourses] = useState([]);
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
              <Button onClick={() => navigate(`/course/${elem.course_id}`)} variant="outline-success" className="me-3">
                Más info
              </Button>
              
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};