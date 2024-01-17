import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage } from '../helpers/localStorageUtils';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';


export const AscendioContext = createContext()

export const AscendioProvider= ({children}) => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState();
  const [isLogged, setIsLogged] = useState(false);


  useEffect(() => {
    const tokenLocalStorage = getLocalStorage("token")
    setToken(tokenLocalStorage)
    if(tokenLocalStorage){ 
      const {user_id,type} = jwtDecode(tokenLocalStorage).user;
      console.log(jwtDecode(tokenLocalStorage));
      console.log("el token", user_id,type);
      axios
        .get(`http://localhost:3000/users/oneuser/${user_id}`)
        .then((res)=>{console.log(res);})
        .catch((err)=>{console.log(err);})
    }
    
  }, [isLogged])

  return (
    <AscendioContext.Provider value={{
      user, 
      setUser,
      token,
      setToken, 
      isLogged, 
      setIsLogged
    }}>
    {children}
    </AscendioContext.Provider>
  )
}