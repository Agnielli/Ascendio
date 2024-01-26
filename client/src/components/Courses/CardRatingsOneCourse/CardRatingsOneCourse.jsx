import React from 'react'
import { Card } from 'react-bootstrap'
import { RatingStars } from '../RatingStars/RatingStars';

export const CardRatingsOneCourse = ({rates}) => {
  console.log(rates);
  return (
    <Card style={{ width: '18rem' }}>
    
    <Card.Body>
      <Card.Title>{rates?.nickname}</Card.Title>
      <RatingStars
        numberstars={rates?.course_rates}
      />
      <Card.Text>
        {rates?.commentary}
      </Card.Text>
      
    </Card.Body>
  </Card>
  )
}
