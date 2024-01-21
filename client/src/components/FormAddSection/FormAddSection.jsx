import React from "react";
import "./formAddSection.scss";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const FormAddSection = ({addSection, setAddSection}) => {

  const navigate = useNavigate()

  const handleSubmit = () =>{

  }

  return (
    <Row>
      <Col>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Título de la unidad </Form.Label>
            <Form.Control
              type="text"
              placeholder="Título de la unidad"
              name="email"
            />
            <Button variant="outline-success"
              className="me-3" onClick={handleSubmit}>Aceptar</Button>
            <Button variant="outline-success"
              className="me-3" onClick={()=>setAddSection(!addSection)}>Cancelar</Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};
