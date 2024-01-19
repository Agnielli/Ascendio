import React, { useContext, useState } from 'react'
import { AscendioContext } from '../../../context/AscendioContext';
import axios from 'axios';

export const OneCourse = () => {

  const [OneCoursePpal, setOneCoursePpal] = useState()
  const { user, setUser,course,setCourse } = useContext(AscendioContext);

  // axios
    // .get(`http://localhost:3000/courses/onecourse/${course_id}`)
  //   .then((res)=>console.log(res))
  //   .catch((err)=>console.log(err))


  return (
    <h2>ESTOY EN ONECOURSE</h2>
  )
}
