import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AscendioContext } from "../../../context/AscendioContext";
import "./EditUser.scss"

const initialValue = {
  nickname: "",
  name: "",
  lastname: "",
  email: "",
  phonenumber: "",
};

export const EditUser = () => {
  const { user, setUser } = useContext(AscendioContext);
  const [editUser, setEditUser] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const [file, setFile] = useState()

  useEffect(() => {
    if (user) {
      setEditUser(user);
    }
  }, [user]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

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
      const newFormData = new FormData();
      newFormData.append("editUser", JSON.stringify(editUser));
      newFormData.append("file", file);

      axios
        .put("http://localhost:3000/users/edituser", newFormData)
        .then((res) => {
          if(res.data.img){
            setUser({ ...editUser, img: res.data.img });
            console.log(res.data.img);           
          }
          else {
            setUser(editUser)
            console.log(res);
          }
          navigate('/profile')
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>

      <div className="avatar" >
          <label htmlFor="fileInput">
            {user?.img ? (
              <img
                src={`http://localhost:3000/images/users/${user?.img}`}
                alt="Avatar"
              />
            ) : (
              <p>{user?.name.charAt(0).toUpperCase()}</p>
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleFile}
          />
        </div>




        <h2>{user?.nickname}</h2>
        <p>
          {" "}
          {user?.name} {user?.lastname}
        </p>
        <Form>
          <h2>Editar usuario:</h2>
          <Form.Group className="mb-3" controlId="formBasicNickName">
            <Form.Label>Nombre de usuario*</Form.Label>
            <Form.Control
              name="nickname"
              onChange={handleChange}
              placeholder="Introduce un nombre de usuario"
              value={editUser.nickname}
              autoComplete="nickname"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre*</Form.Label>
            <Form.Control
              name="name"
              onChange={handleChange}
              placeholder="Introduce un nombre"
              value={editUser.name}
              autoComplete="username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Apellido*</Form.Label>
            <Form.Control
              name="lastname"
              onChange={handleChange}
              placeholder="Introduce un apellido"
              value={editUser.lastname}
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
              value={editUser.email}
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
              value={editUser.phonenumber === null ? "" : editUser.phonenumber}
              autoComplete="tel"
            />
          </Form.Group>

         

          
          <p>{msgError}</p>

          <Button variant="primary me-2" onClick={handleSubmit}>
            aceptar
          </Button>

          <Button onClick={() => navigate("/profile")}>cancelar</Button>
        </Form>
      </Col>
    </Row>
  );
};
 
