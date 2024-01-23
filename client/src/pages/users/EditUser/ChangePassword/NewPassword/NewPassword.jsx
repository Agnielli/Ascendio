import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from 'react-bootstrap'


const initialValue = {
  password: "",
  password2: "",
}

export const NewPassword = ({user}) => {
  const [NewPassword, setNewPassword] = useState(initialValue);
  const [msgError, setMsgError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const verPassword = () => {
    setShowPassword(!showPassword);
  };
  const verPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
 
  

  const handleChange = (e) => {
    setNewPassword({
      ...NewPassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!NewPassword.password || !NewPassword.password2) {
      setMsgError("Algun campo no está relleno");
    } else if (NewPassword.password !== NewPassword.password2) {
      setMsgError("Las contraseñas no coinciden");
    } else {
      axios
        .put(`http://localhost:3000/users/updatepassword/${user?.user_id}`, {
          id: user?.user_id,
          password: NewPassword.password,
        })
        .then((res) => {
          console.log(res.data);
          setMsgError("Contraseña actualizada con exito");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
   
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Introduce nueva contraseña</Form.Label>
            <div className="password-container">
            <Form.Control
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Introduce nueva contraseña"
              value={NewPassword.password}
              autoComplete="new-password"
            />
            <span className=" eye-icon pisition-absolute pointer password-icon" onClick={verPassword}>
                {showPassword ?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg> 
            :
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
            </svg>
            
             }
              </span>
              </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Confirma la nueva contraseña</Form.Label>
            <div className="password-container">
            <Form.Control
              name="password2"
              onChange={handleChange}
              type={showPassword2 ? "text" : "password"}
              placeholder="Confirma la nueva contraseña"
              value={NewPassword.password2}
              autoComplete="new-password"
            />
            <span className=" eye-icon pisition-absolute pointer password-icon" onClick={verPassword2}>
                {showPassword2 ?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg> 
            :
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
            </svg>
            
             }
              </span>
              </div>
          </Form.Group>
          
          <p>{msgError}</p>
          <Button className="me-3" onClick={handleSubmit}>
            Aceptar
          </Button>
        </Form>
      
  )
}
