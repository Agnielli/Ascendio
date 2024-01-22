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

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const verPassword = () => {
    setShowPassword(!showPassword);
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
          } else if (err.response.data.message === "Correo no valido") {
            setMsgError("El correo introducido no es valído para registrarse");
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
          <h2>ASCENDIO</h2>
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
            <div className="password-container">
              <Form.Control
                name="password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Introduce una contraseña"
                value={register.password}
                autoComplete="new-password"
              />
              <span
                className="eye-icon pisition-absolute pointer password-icon"
                onClick={verPassword}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height={"1.5rem"}
                  >
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height={"1.5rem"}
                  >
                    <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                  </svg>
                )}
              </span>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Confirma la contraseña</Form.Label>
            <div className="password-container">
              <Form.Control
                name="password2"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Introduce una contraseña"
                value={register.password2}
                autoComplete="new-password"
              />
              <span
                className="pisition-absolute pointer password-icon"
                onClick={verPassword}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height={"1.5rem"}
                  >
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height={"1.5rem"}
                  >
                    <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                  </svg>
                )}
              </span>
            </div>
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
      </Col>
    </Row>
  );
};
