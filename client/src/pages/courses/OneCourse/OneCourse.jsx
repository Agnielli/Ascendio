import React, { useContext, useEffect, useState } from 'react'
import { AscendioContext } from '../../../context/AscendioContext';
import axios from 'axios';

export const OneCourse = () => {

  const [OneCoursePpal, setOneCoursePpal] = useState();
  const { user, setUser,course,setCourse } = useContext(AscendioContext);

<<<<<<< HEAD
  // axios
    // .get(`http://localhost:3000/courses/onecourse/${course_id}`)
  //   .then((res)=>console.log(res))
  //   .catch((err)=>console.log(err))
=======
  useEffect((course_id)=>{
>>>>>>> master

    axios
    .get(`http://localhost:3000/courses/onecourse/${course_id}`)
    .then((res)=>{
      console.log(res.data);
      setOneCoursePpal(res.data)
    })
    .catch((err)=>console.log(err))
  }, [])
  

  return (
    <div>
    <h2>ESTOY EN ONECOURSE</h2>
    {/* <h3>{course.title}</h3> */}
    </div>
  )
}
