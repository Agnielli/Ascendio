import React from 'react'
import { Button, Card } from 'react-bootstrap'

export const CommentCard = ({elem}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{elem.nickname}</Card.Title>
        <Card.Text>
            {elem.description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
