import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ResourceViewer = () => {

const {course_id, link} = useParams();

  return (
    <div>
      <h1>Hiiiiii</h1>

      <iframe src={`http://localhost:3000/images/resource/${link}`} frameBorder="0"></iframe>
      
      </div>
  )
}
