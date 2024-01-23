import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const initialValue = {
  nickname: "",
  name: "",
  lastname: "",
  email: "",
  phonenumber: "",
  
};

export const FormEdit = ({ user, setUser}) => {
  const [editUser, setEditUser] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setEditUser(user);
    }
  }, [user]);


  const handleSubmit = () => {
          if (
            !editUser.nickname ||
            !editUser.name ||
            !editUser.lastname ||
            !editUser.email ||
            !editUser.password
          ) {
            setMsgError("*Los campos obligatorios deben estar rellenos");
          } else {
            let file = [];
            const newFormData = new FormData();
            newFormData.append("editUser", JSON.stringify(editUser));
            newFormData.append("file", file);
    
            axios
              .put("http://localhost:3000/users/edituser", newFormData)
              .then((res) => {
                // if (res.data.img) {
                //   setUser({ ...editUser, img: res.data.img });
                //   console.log(res.data.img);
                // } else {
                  setUser(editUser);
                  console.log(res);
                // }
                navigate("/profile");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
       
    

  

  const handleChange = (e) => {
    const {name, value} = e.target
    setEditUser ({...editUser, [name]: value})
    
  }

  console.log(editUser);

  return (
    <Form>
    
        <h2>Editar usuario:</h2>
        <Form.Group className="mb-3" controlId="formBasicNickName">
          <Form.Label>Nombre de usuario*</Form.Label>
          <Form.Control
            name="nickname"
            onChange={handleChange}
            placeholder="Introduce un nombre de usuario"
            value={editUser?.nickname}
            autoComplete="nickname"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nombre*</Form.Label>
          <Form.Control
            name="name"
            onChange={handleChange}
            placeholder="Introduce un nombre"
            value={editUser?.name}
            autoComplete="username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Apellido*</Form.Label>
          <Form.Control
            name="lastname"
            onChange={handleChange}
            placeholder="Introduce un apellido"
            value={editUser?.lastname}
            autoComplete="lastname"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo*</Form.Label>
          <Form.Control
            name="email"
            onChange={handleChange}
            type="text"
            placeholder="Introduce un correo"
            value={editUser?.email}
            autoComplete="email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhonenumber">
          <Form.Label>Número de teléfono</Form.Label>
          <Form.Control
            name="phonenumber"
            onChange={handleChange}
            type="text"
            placeholder="Introduce un número"
            value={
              editUser?.phonenumber === null ? "" : editUser?.phonenumber
            }
            
          />
        </Form.Group>

        <p>{msgError}</p>
     

    <Button variant="primary me-2" onClick={handleSubmit}>
      aceptar
    </Button>

    <Button onClick={() => navigate("/profile")}>cancelar</Button>
  </Form>
  )
}
