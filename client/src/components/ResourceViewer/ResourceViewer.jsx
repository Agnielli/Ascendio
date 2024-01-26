import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ResourceViewer = () => {

const {course_id, link} = useParams();
// const [resource, setResource] = useState()

// useEffect(()=>{

//   axios
//     .get(`http://localhost:3000/courses/gettyperesource/`)
//     .then((res)=>{
//       setResource(res?.data)
//     })
//     .catch((err)=>{
//       console.log(err);
//     })
// }, [])
// console.log(resource)

  return (
    <div>
      <h1>Hiiiiii</h1>


      <iframe src={`http://localhost:3000/images/resource/${link}`} frameBorder="0"></iframe>
      
      {/* <iframe src={link} frameBorder="0"></iframe> */}
    
      </div>
  )
}
