import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Estadisticas = () => {
  const [stats, setStats] = useState()
  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/allstatistics`)
      .then((res) => {
        console.log(res.data)
        setStats(res.data)
      })
      .catch((err) => {console.log(err)})
  }, [])


  return (
    <>
      {stats?.map((elem, index) => {
        return (
          <div key={index}>
            <p>Usuarios: {elem.count_type_2}</p>
            <p>Admins: {elem.count_type_1}</p>
            <p>Trades Publicados: {elem.num_posts}</p>
            <p>Cursos Publicados: {elem.num_courses}</p>
          </div>
        )
      })}
    </>
  )
}
