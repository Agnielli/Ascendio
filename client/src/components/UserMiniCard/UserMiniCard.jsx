import React from 'react'
import './UserMiniCard.scss'
import { Button } from 'react-bootstrap'
import axios from 'axios'

export const UserMiniCard = ({elem, showAllUsers, reset, setReset}) => {

  const disableUser = (id) => {
    axios
      .put(`http://localhost:3000/admin/disableuser/${id}`)
      .then((res) => {setReset(!reset)})
      .catch((err) => {console.log(err)})
  }

  return (
    <div className='userMiniCardAdminView'>
      <div className='d-flex flex-column'>
        <div className='userImg'>{elem.img}</div>
        <p>{elem.nickname}</p>
        <p>Seguidores: </p>
      </div>
      <div className='d-flex flex-row'>
       
        <div className='d-flex flex-column mt-5 ms-3'>
          <p>Numero aciertos: </p>
          <p>Numero errores: </p>
          <div>
            <Button onClick={() => disableUser(elem.user_id)}>Bloquear</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
