import React, { createContext, useEffect, useState } from 'react'
// import { getLocalStorage } from '../helpers/localStorageUtils';
// import { jwtDecode } from "jwt-decode";
// import axios from 'axios';

export const AscendioContext = () => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {

  }, [])

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
