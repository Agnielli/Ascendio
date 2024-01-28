import React, { useContext } from 'react'
import './saveCourse.scss'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { SaveCourseCard } from '../../../components/Courses/SaveCourseCard/SaveCourseCard'


export const SaveCourse = () => {
  
  const navigate = useNavigate()

  return (
    <div>
      <Button onClick={()=>navigate('/profile')}>Volver</Button>
      <SaveCourseCard />
      
      </div>
  )
}
