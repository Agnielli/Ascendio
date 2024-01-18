import React from 'react'
import './purchaseCourse.scss'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PurchaseCourseCard } from '../../../components/Courses/PurchaseCourseCard/PurchaseCourseCard'

export const PurchaseCourse = () => {
  
  const navigate = useNavigate()

  return (
    <div>
      <Button onClick={()=>navigate('/profile')}>Volver</Button>
      <h3>PurchaseCourse</h3>
      <PurchaseCourseCard/>
      </div>
  )
}
