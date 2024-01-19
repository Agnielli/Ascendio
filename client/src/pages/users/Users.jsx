import React, { useContext } from 'react';
import './users.scss';
import { useNavigate } from 'react-router-dom';
import {Button} from "react-bootstrap"
import { AscendioContext } from '../../context/AscendioContext';

export const Users = () => {
  const { user } = useContext(AscendioContext);
  

  const navigate = useNavigate()

  return (
    <div className='d-flex flex-column w-25 gap-2'>

      <div className="avatar">
                      {user?.user_img ? (
                        <img
                          src={`http://localhost:3000/images/users/${user.img}`}
                        />
                      ) : (
                        <p>{user?.name.charAt(0).toUpperCase()}</p>
                      )}
                    </div>
                    <h2>{user?.nickname}</h2>
      <p> {user?.name} {user?.lastname}</p>
      <Button onClick={()=>navigate('/edituser')}>Editar perfil</Button>

      <Button onClick={()=>navigate('/createcourse')}>Crear curso</Button>
      <Button onClick={()=>navigate('/createtrade')}>Crear trade</Button>
      <Button onClick={()=>navigate('/purchasecourse')}>Cursos adquiridos</Button>
      <Button onClick={()=>navigate('/savecourse')}>Cursos guardados</Button>
    </div>
  )
}
