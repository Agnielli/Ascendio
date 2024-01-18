import React from 'react'
import './saveCourse.scss'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const SaveCourse = () => {

  const navigate = useNavigate()

  return (
    <div>
      <Button onClick={()=>navigate('/profile')}>Volver</Button>
      <h3>SaveCourse</h3>
      <p>Aquí tengo que hacer el mapeo del compoenent SaveCourseCard</p>
      </div>
  )
}
