import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Landing = () => {
    return (
    <>
    <h2 >Landing</h2>
    
    <footer className="d-flex justify-content-between align-items-center ">
      <h3>ASCENDIO</h3>
      <p> &copy; 2024 Ascendio, inc</p>

      <Link to="/termsandconditions">
          Therms & Conditions
        </Link>

        <Link to="/privacy">
          Privacy
        </Link>

        <Link to="/cookiespolicy">
        Cookies Policy          
        </Link>    
    </footer>    
    </>

  )
}
