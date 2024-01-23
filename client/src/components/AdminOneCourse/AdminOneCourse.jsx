import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

export const AdminOneCourse = ({elem}) => {

  const disableCourse = (course_id) => {
    axios
      .put(`http://localhost:3000/admin/admindisableonecourse/${course_id}`)
      .then((res) => {console.log(res)})
      .catch((err) => {console.log(err)})
  }

  return (
    <div>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title><p>{elem.title}</p></Card.Title>
        <Card.Text>
         {elem.description}
        </Card.Text>
        <Card.Text>
          {elem.nickname}
        </Card.Text>
        <Button variant="primary" onClick={() => disableCourse(elem.course_id)}>Desactivar</Button>
      </Card.Body>
    </Card>
    </div>
  )
}
