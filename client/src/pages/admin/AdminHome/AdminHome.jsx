import React from 'react';
import './adminHome.scss';
import { Button, Col, Row } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';

export const AdminHome = () => {

  const navigate = useNavigate()

  return (
   <Row>
      <Col className='d-flex flex-column gap-2'>
        <h3>Administrador</h3>
        <Button onClick={()=> navigate('allusers')}>Usuarios</Button>
        <Button onClick={()=> navigate('allcourses')}>Cursos</Button>
        <Button onClick={()=> navigate('alldata')}>Estadisticas</Button>
      </Col>
      <Col>
        <h3>Aquí va toda la información</h3>
        <Outlet/>
      </Col>
       
   </Row>

  )
}
