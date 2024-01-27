import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { AscendioContext } from '../../context/AscendioContext';
import { useParams } from 'react-router-dom';



export const CardRates = ({resetCourse, setResetCourse, newRate, setNewRate}) => {

  // const [newRate, setNewRate] = useState(initialValue);
  const course_id = useParams().course_id;
  const {user} = useContext(AscendioContext)
  let usuario = user.user_id

  useEffect(()=>{
    
  },[newRate])
  
  const handleSubmit = () =>{
    const {course_rates, commentary} = newRate
    let data = { course_rates, commentary, usuario };
    console.log("DATAAAA", data)
    axios
    .post(`http://localhost:3000/courses/userrateonecourse/${course_id}`, data)
    .then((res)=>{
      setResetCourse(!resetCourse)
    })
      .catch((err)=>{
        console.log(err)
      })
  }
  const handleChange = (e) => {
    const {name, value} = e.target
    setNewRate({...newRate, [name]: value});
  };
  
  
  return (
    <Card style={{ width: '18rem' }}>
      <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tu opinión no me importa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Puntúa de 1 a 5"
              name="course_rates"
              value={newRate.course_rates}
              onChange={handleChange}
            />
            <Form.Control
              type="text"
              placeholder="Da tu opinión"
              name='commentary'
              value={newRate.commentary}
              onChange={handleChange}
            />
            <Button
              variant="outline-success"
              className="me-3"
              onClick={handleSubmit}
            >
              Aceptar
            </Button>
          </Form.Group>
        </Form>
    </Card>
  )
}
