import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { EnabledCourses } from '../EnabledCourses/EnabledCourses'

export const EnabledCoursesMap = () => {
  const [enabledCourses, setEnabledCourses] = useState()
  const [updateCourses, setUpdateCourses] = useState(false)

  useEffect(() => {
      axios
        .get(`http://localhost:3000/admin/getallenabledcourses`)
        .then((res) => {
          console.log(res)
          console.log(res.data)
          setEnabledCourses(res.data)
          setUpdateCourses(false)
          
        })
        .catch((err) => console.log(err))

  }, [updateCourses])
  
  return (
    <>
      {enabledCourses?.map((elem, index) => {
        return (
          <EnabledCourses elem={elem} key={index} setUpdateCourses={setUpdateCourses}/>
        )
      })}
    </>
  )
}
