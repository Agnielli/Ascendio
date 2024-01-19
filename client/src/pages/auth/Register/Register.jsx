import React, { useState } from "react";
import "./register.scss";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ModalRegister } from "./ModalRegister/ModalRegister";

const initialValue = {
  nickname: "",
  name: "",
  lastname: "",
  email: "",
  email2: "",
  password: "",
  password2: "",
};

export const Register = () => {
  const [register, setRegister] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = () => {

    if (
      !register.nickname ||
      !register.name ||
      !register.lastname ||
      !register.email ||
      !register.password ||
      !register.email2 ||
      !register.password2
    ) {
      setMsgError("Algun campo no está relleno");
    } else if (register.email !== register.email2) {
      setMsgError("Los correos no coinciden");
    } else if (register.password !== register.password2) {
      setMsgError("Las contraseñas no coinciden");
    } else {
      axios
        .post("http://localhost:3000/users/createuser", register)
        .then((res) => {
          console.log(res.data);
          setShowModal(true);
        })
        .catch((err) => {
          console.log(err);
          if (
            err.response.data.error?.errno === 1062 &&
            err.response.data.error?.sqlMessage.includes("user.email")
          ) {
            setMsgError("Email duplicado");
          } else if (
            err.response.data.error?.errno === 1062 &&
            err.response.data.error?.sqlMessage.includes("user.nickname")
          ) {
            setMsgError("Nombre de usuario duplicado");
          } else if (err.response.data.error?.errno === 1406) {
            setMsgError("Campo demasiado largo");
          } else {
            setMsgError("Upps ha habido algún error");
          }
        });
    }

  };

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <Form>
          <h3>Registro</h3>
          <Form.Group className="mb-3" controlId="formBasicNickName">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              name="nickname"
              onChange={handleChange}
              placeholder="Introduce un nombre de usuario"
              value={register.nickname}
              autoComplete="nickname"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="name"
              onChange={handleChange}
              placeholder="Introduce un nombre"
              value={register.name}
              autoComplete="username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              name="lastname"
              onChange={handleChange}
              placeholder="Introduce un apellido"
              value={register.lastname}
              autoComplete="lastname"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              name="email"
              onChange={handleChange}
              type="text"
              placeholder="Introduce un correo"
              value={register.email}
              autoComplete="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail2">
            <Form.Label>Confirma el correo</Form.Label>
            <Form.Control
              name="email2"
              onChange={handleChange}
              type="text"
              placeholder="Introduce un correo"
              value={register.email2}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Introduce una contraseña"
              value={register.password}
              autoComplete="new-password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Confirma la contraseña</Form.Label>
            <Form.Control
              name="password2"
              onChange={handleChange}
              type="password"
              placeholder="Introduce una contraseña"
              value={register.password2}
              autoComplete="new-password"
            />
          </Form.Group>
          <p>{msgError}</p>
          <Button className="me-3" onClick={handleSubmit}>
            Aceptar
          </Button>
          <Button onClick={() => navigate("/")} variant="primary">
            Cancelar
          </Button>
          <p>
            Ya estás registrado? <Link to="/login">Loguéate</Link>
          </p>
        </Form>


        <ModalRegister
          showModal={showModal}
          setShowModal={setShowModal}
          email={register?.email}
        ></ModalRegister>
        {/* <Button onClick={()=>{setShowModal(true)}}>Modal</Button> */}

      </Col>
    </Row>
  );
};
