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
            <Form.Control
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Introduce nueva contraseña"
              value={NewPassword.password}
              autoComplete="new-password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Confirma la nueva contraseña</Form.Label>
            <Form.Control
              name="password2"
              onChange={handleChange}
              type="password"
              placeholder="Confirma la nueva contraseña"
              value={NewPassword.password2}
              autoComplete="new-password"
            />
          </Form.Group>
          <p>{msgError}</p>
          <Button className="me-3" onClick={handleSubmit}>
            Aceptar
          </Button>
        </Form>
      
  )
}
