import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialValue = {
  nickname: "",
  name: "",
  lastname: "",
  phonenumber: "",
};

export const FormEdit = ({ user, setUser, setShowForm }) => {
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
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);
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
          setMsgError("Datos actualizadoos con exito");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  console.log(editUser);

  return (
    <div className="FormularioDatosUsuario">
      <div className="avatar">
    <>
    
      <h2>Editar usuario:</h2>
      <div className="avatar d-flex align-items-center justify-content-center">
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
      <Form className="FormulariosContainer d-flex flex-column">
        <Form.Group className="mb-3" controlId="formBasicNickName">
          <Form.Label></Form.Label>
          <Form.Control
            name="nickname"
            onChange={handleChange}
            placeholder="Introduce un nombre de usuario"
            value={editUser?.nickname}
            autoComplete="nickname"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label></Form.Label>
          <Form.Control
            name="name"
            onChange={handleChange}
            placeholder="Introduce un nombre"
            value={editUser?.name}
            autoComplete="username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label></Form.Label>
          <Form.Control
            name="lastname"
            onChange={handleChange}
            placeholder="Introduce un apellido"
            value={editUser?.lastname}
            autoComplete="lastname"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhonenumber">
          <Form.Label></Form.Label>
          <Form.Control
            name="phonenumber"
            onChange={handleChange}
            type="text"
            placeholder="Introduce un número de teléfono"
            value={editUser?.phonenumber === null ? "" : editUser?.phonenumber}
          />
        </Form.Group>

        <p style={{ marginBottom: '1rem' }}>{msgError || '\u00A0'}</p>

        <div className="DivGrisParaBotones d-flex justify-content-between mt-3 mb-1">
          <Button className="Button3" variant="primary me-2" onClick={handleSubmit}>
            ACEPTAR
          </Button>
          <Button  className="Button1"onClick={() => setShowForm(false)}>CANELAR</Button>
        </div>
      </Form>
    </div>
  );
};
