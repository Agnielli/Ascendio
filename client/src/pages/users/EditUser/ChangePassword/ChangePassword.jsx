import React, { useState } from 'react'
import { VeryFyPassword } from './VerifyPassword/VeryFyPassword';
import { NewPassword } from './NewPassword/NewPassword';
import { useParams } from 'react-router-dom';


export const ChangePassword = ({user}) => {
  
  const [showVerifyPassword, setShowVerifyPassword] = useState(true)
  const [showNewPassword, setShowNewPassword] = useState(false)
  
  return (    
     <>
      {showVerifyPassword && <VeryFyPassword 
       setShowNewPassword = {setShowNewPassword}
       setShowVerifyPassword = {setShowVerifyPassword}
      
      />}
      {showNewPassword && <NewPassword
      user = {user}/>}
    </>
  )
}
