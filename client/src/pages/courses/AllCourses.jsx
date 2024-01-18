import React, { useEffect, useState } from 'react';
import './courses.scss';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

export const AllCourses = () => {

  const [allcourses, setAllcourses] = useState()
  const [comprado, setComprado] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    axios
      .get('http://localhost:3000/courses/callcourses')
      .then((res)=>{
        console.log("aa",res.data);
        setAllcourses(res.data)})
      .catch((err)=>{
        console.log(err)})
  }, [])



   const comprarCurso = () =>{
    // axios
    // //let id = res.data[0].course_id
    //   .get(`http://localhost:3000/courses/purchasecourse/${id}`)
    //   .then((res)=>{
    //     setComprado(true) //se necesita este estado o ya hago el cambio con la select de la bbdd
    //     navigate('/profile')
    //     console.log(res)})
    //   .catch((err)=>{
    //     console.log(err)})
  }

  return (
    <div>
      <h1>ALL courses</h1>
      <p> TODO: mapeo y Use Effect -array de dependencia con comprado- con todos los cursos</p>

      {allcourses?.map ((elem) =>{
        return(
          <Card style={{ width: '18rem' }} key={elem.course_id}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title> {elem.title} </Card.Title>
            <Card.Text>
              {elem.description}
            </Card.Text>
            <Button variant="primary">Comprar</Button>
          </Card.Body>
        </Card>
        )
      })}
    </div>
  )
}
