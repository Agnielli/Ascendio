import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AdminOneCourse } from '../AdminOneCourse/AdminOneCourse'

export const AdminCourses = () => {
  const [course, setCourse]  = useState()

  useEffect(() => {
    axios
        .get(`http://localhost:3000/admin/admingetallcourses`)
        .then((res) => {
          console.log(res)
          setCourse(res.data)
        })
        .catch((err) => {console.log(err)})
  }, [])

 
  return (
    <>
    {course?.map((elem) => {
      return (
        <AdminOneCourse elem={elem} key={elem.course_id}/>
      )
    })}
    </>
  )
}