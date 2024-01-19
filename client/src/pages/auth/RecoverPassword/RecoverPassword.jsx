import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
const initialValue = {
  password: "",
  password2: "",
};
export const RecoverPassword = () => {
  const { token } = useParams();
  const [recover, setRecover] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  console.log(token)
  const handleChange = (e) => {
    setRecover({
      ...recover,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!recover.password || !recover.password2) {
      setMsgError("Algun campo no está relleno");
    } else if (recover.password !== recover.password2) {
      setMsgError("Las contraseñas no coinciden");
    } else {
      axios
        .put(`http://localhost:3000/users/recoverpassword/${token}`, recover)
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
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <Form>
          <h3>Recupera tu contraseña</h3>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Introduce nueva contraseña</Form.Label>
            <Form.Control
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Introduce nueva contraseña"
              value={recover.password}
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
              value={recover.password2}
              autoComplete="new-password"
            />
          </Form.Group>
          <p>{msgError}</p>
          <Button className="me-3" onClick={handleSubmit}>
            Aceptar
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
