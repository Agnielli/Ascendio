import React from 'react';
import './users.scss';
import { useNavigate } from 'react-router-dom';
import {Button} from "react-bootstrap"

export const Users = () => {

  const navigate = useNavigate()

  return (
    <div className='d-flex flex-column w-25 gap-2'>
      <Button onClick={()=>navigate('/createcourse')}>Crear curso</Button>
      <Button onClick={()=>navigate('/createtrade')}>Crear trade</Button>
      <Button onClick={()=>navigate('/purchasecourse')}>Cursos adquiridos</Button>
      <Button onClick={()=>navigate('/savecourse')}>Cursos guardados</Button>
    </div>
  )
}
