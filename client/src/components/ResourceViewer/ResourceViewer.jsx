import React from 'react'
import { useParams } from 'react-router-dom'

export const ResourceViewer = () => {

  const {course_id, link} = useParams();
console.log("dffffffffff", course_id);
console.log("dffffffffff", link);

  return (
    <div>
      <h1>Hiiiiii</h1>
      <iframe src="http://localhost:3000/images/resource/fede.pdf" frameborder="0"></iframe>
      </div>
  )
}
