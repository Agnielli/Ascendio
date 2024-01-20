import React, { useContext, useEffect, useState } from 'react'
import { AscendioContext } from '../../../context/AscendioContext';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import { EditOneCourse } from '../EditOneCourse.jsx/EditOneCourse';
import { useParams } from 'react-router-dom';

export const OneCourse = () => {

  const [oneCoursePpal, setOneCoursePpal] = useState();
  const { user, setUser,userCourse,setUserCourse } = useContext(AscendioContext);
  const course_id = useParams().course_id;
 

  useEffect(()=>{
    console.log("HOLAAAAAAA SANTIII");

    axios
    .get(`http://localhost:3000/courses/onecourse/${course_id}`)
    .then((res)=>{
      
      console.log(res.data);
      setOneCoursePpal(res.data[0])
    })
    .catch((err)=>{
      console.log(err)
      console.log("ME VOOOOOOOOOOY")
    })
  }, [])
  
 const formatearFecha = (date) => {
  return date.split("T")[0].split("-").reverse().join("-");
 }
  //crear un useeffect para insertar la fecha array de dependencias curso principales
  //let dateNew = oneCoursePpal?.date
  //let formattedDate = dateNew.split("T")[0].split("-").reverse().join("-");

  return (
    <>
<h2>AQUI QUIERO EL CURSO QUE ACABO DE CREAR EN EL FORMULARIO EDITAR CURSO con el id {oneCoursePpal?.course_id} </h2>
<Card  style={{ width: '40rem' }}>
<Card.Img variant="top" src={`http://localhost:3000/images/cursos/${oneCoursePpal?.img}`} />
<Card.Body>
  <Card.Title> Title: {oneCoursePpal?.title} </Card.Title>
  <Card.Subtitle>
  {oneCoursePpal && "Creado:" + formatearFecha(oneCoursePpal.date)}
  
  </Card.Subtitle>
  <Card.Text>
  {oneCoursePpal?.description}
  </Card.Text>
  <Card.Text>
  {oneCoursePpal?.price}€
  </Card.Text>

  <Button  variant="primary">Añadir Tema</Button>
  <Button variant="primary">Editar curso</Button>
</Card.Body>
</Card>

<EditOneCourse/>

</>
  )
}
