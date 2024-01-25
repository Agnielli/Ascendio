import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DisabledCourses } from '../DisabledCourses/DisabledCourses'

export const DisabledCoursesMap = () => {
  const [disabledCourses, setDisabledCourses] = useState()
  const [updateCourses, setUpdateCourses] = useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/getalldisabledcourses`)
      .then((res) => {
        console.log(res)
        setDisabledCourses(res.data)
        setUpdateCourses(false)
      })
      .catch((err) => {console.log(err)})

  }, [updateCourses])

  return (
    <>
      {disabledCourses?.map((elem, index) => {
        return (
          <DisabledCourses setUpdateCourses={setUpdateCourses} elem={elem} key={index}/>
        )
      })}
    </>
  )
}
