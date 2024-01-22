import React, { useContext, useEffect, useState } from 'react';
import './courses.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { AscendioContext } from '../../context/AscendioContext';
import { textSensitive } from '../../helpers/utils';
export const AllCourses = () => {
  // const { user } = useContext(AscendioContext);
  const [allcourses, setAllcourses] = useState([]);
  const [findCourse, setFindCourse] = useState();
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {

    axios
      .get(`http://localhost:3000/courses/callcourses`)
      .then((res) => {
        console.log(res.data);
        setAllcourses(res.data);
        setFindCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) =>{
    setFilter(e.target.value)
  }

  const handleClick = (e) => {
    if(filter === ''){
      setFindCourse(allcourses);
    }else{
      const tempArray = allcourses.filter((e)=>{
        return (
          textSensitive(e.title, filter)
        )
      })
      setFindCourse(tempArray)
    }
    setFilter("")
  }
  
  return (
    <section >
      <div  className='d-flex justify-content-center p-5'>
      <h2>All courses</h2>
      <input
        onChange={handleChange}
        placeholder='Búsqueda por título'
        value={filter}
        />
        <Button variant="outline-success" onClick={handleClick}>Buscar</Button>
      </div>
      <article className='d-flex justify-content-center gap-2 flex-wrap'> 
      {findCourse?.map((elem) => {
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
      </article>
    </section>
  );
};