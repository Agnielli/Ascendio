import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const initialValue = {
  nickname: "",
  name: "",
  lastname: "",
  phonenumber: "",
  
};

export const FormEdit = ({ user, setUser, setShowForm}) => {
  const [editUser, setEditUser] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const [file, setFile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setEditUser(user);
    }
  }, [user]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };


  const handleSubmit = () => {
          if (
            !editUser.nickname ||
            !editUser.name ||
            !editUser.lastname ||
            !editUser.password
          ) {
            setMsgError("*Los campos obligatorios deben estar rellenos");
          } else {
            
            const newFormData = new FormData();
            newFormData.append("editUser", JSON.stringify(editUser));
            newFormData.append("file", file);
    
            axios
              .put("http://localhost:3000/users/edituser", newFormData)
              .then((res) => {
                 if (res.data.img) {
                setUser({ ...editUser, img: res.data.img });
                 console.log(res.data.img);
                 } else {
                  setUser(editUser);
                  console.log(res);
                 }
                 setMsgError("Datos actualizadoos con exito")
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
    <>
    <div className="avatar">
          <label htmlFor="fileInput">
            {user?.img ? (
              <img
                src={`http://localhost:3000/images/users/${user?.img}`}
                alt="Avatar"
              />
            ) : (
               <p>{user?.nickname.charAt(0).toUpperCase()}</p> 
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleFile}
          />
        </div>
    
    
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

    <Button onClick={() => setShowForm(false)}>cancelar</Button>
  </Form>
  </>
  )
}
