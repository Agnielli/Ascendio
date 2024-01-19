import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ModalMailRevoverPassword } from "./ModalMailRecoverPassword/ModalMailRevoverPassword";
import axios from "axios";

// NO SABEMOS SI SERÄ UNA RUTA O VISTA A PARTE O COMO COMPONENTE EN EL LOGIN

// VISTA DONDE SE INTRODUCE EL MAIL PARA RECIBIR EL LINK DE CAMBIA DE CONTRASEÑA

const initialValue = {
  email: "",
};

export const MailRecoverPassword = () => {
  const [emailRecover, setEmailRecover] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailRecover({ ...emailRecover, [name]: value });
  };
  console.log(emailRecover?.email);

  const handleSubmit = () => {
    if (!emailRecover.email) {
      setMsgError("Introduce tu email");
    } else if (!emailRecover.email.includes("@")) {
      setMsgError("email no valido");
    } else {
      axios
        .post("http://localhost:3000/users/mailrecoverpassword", {
          email: emailRecover.email,
        })
        .then((res) => {
          console.log(res);
          setShowModal(true);
        })
        .catch((err) => {
          if (err.response.data.error?.errno === 400) {
            setMsgError("Email no valido");
          } else if (err.response.data.message) {
            setMsgError("Email no valido");
          } else {
            console.log(err);
          }
        });
    }
  };

  const navigate = useNavigate();

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <Form>
          <h2>Ascendio</h2>
          <h3>Recupera tu contraseña</h3>
          <p>Introduce tu email para crear una nueva contraseña para tu cuenta </p>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              onChange={handleChange}
              name="email"
              //login.email
            />
          </Form.Group>
          <p>{msgError}</p>
          <Button
            className="me-3"
            variant="outline-success"
            onClick={handleSubmit}
          >
            Aceptar
          </Button>
          <Button onClick={() => navigate("/login")} variant="outline-success">
            Cancelar
          </Button>
        </Form>
        <ModalMailRevoverPassword
          showModal={showModal}
          setShowModal={setShowModal}
          email={emailRecover?.email}
        ></ModalMailRevoverPassword>
      </Col>
    </Row>
  );
};
