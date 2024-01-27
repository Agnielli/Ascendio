import "../../../../public/stylesheets/ButtonsApp.scss"
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ModalMailRevoverPassword } from "./ModalMailRecoverPassword/ModalMailRevoverPassword";

import axios from "axios";
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
    <Row className="FormulariosContainer">
      <Col md={4}>
        <Form>
          <h2>Ascendio</h2>
          <h3 className="mb-3">Recupera tu contraseña</h3>
          <p>Introduce tu email para crear una nueva contraseña para tu cuenta </p>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label></Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              //login.email
            />
          </Form.Group>
          <p>{msgError}</p>
          <div className="DivGrisParaBotones d-flex justify-content-between mt-3 mb-1">
            <Button
              className="Button2"
              variant="outline-success"
              onClick={handleSubmit}
            >
              Aceptar
            </Button>
            <Button className="Button2" onClick={() => navigate("/login")} variant="outline-success">
              Cancelar
            </Button>
          </div>
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
