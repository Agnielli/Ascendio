import React from 'react';
import './users.scss';
import { useNavigate } from 'react-router-dom';

export const Users = () => {

  const navigate = useNavigate()

  return (
    <div>
      <button onClick={()=>navigate('/createcourse')}>Crear curso</button>

    </div>
  )
}
