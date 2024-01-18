import React from 'react'
import './purchaseCourse.scss'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const PurchaseCourse = () => {

  const navigate = useNavigate()

  return (
    <div>
      <Button onClick={()=>navigate('/profile')}>Volver</Button>
      <h3>PurchaseCourse</h3>
      <p>Aquí tengo que hacer el mapeo del componente PurchaseCourseCard</p>
      </div>
  )
}
