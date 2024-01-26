import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

export const AdminOneCourse = ({elem, updateCourses, setUpdateCourses}) => {

  const disableEnableCourse = (course_id, is_disabled) => {
    let url = `http://localhost:3000/admin/adminenableonecourse/${course_id}`
    if (is_disabled === 0) {
      url = `http://localhost:3000/admin/admindisableonecourse/${course_id}`
    }
    axios
      .put(url)
      .then((res) => {
        setUpdateCourses(!updateCourses) 
        console.log(res.data)
      })
      .catch((err) => {console.log(err)})
  }
  

  return (
    <div>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`http://localhost:3000/images/cursos/${elem.course_img}`} />
      <Card.Body>
        <Card.Title><p>{elem.title}</p></Card.Title>
        <Card.Text>
         {elem.description}
        </Card.Text>
        <Card.Text>
          {elem.nickname}
        </Card.Text>
        <Button onClick={() => disableEnableCourse(elem?.course_id, elem?.is_disabled)}>
                {elem.is_disabled ? "Activar" :
                "Desactivar"}
              </Button>
      </Card.Body>
    </Card>
    </div>
  )
}
