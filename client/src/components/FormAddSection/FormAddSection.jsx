import React from "react";
import "./formAddSection.scss";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const FormAddSection = ({sections, setSections, addSection, setAddSection,course_id}) => {

  const [newSection, setNewSection] = useState("");

  const handleChange = (e) =>{
    setNewSection(e.target.value)
  }

  const handleSubmit = () =>{
    let data = {newSection,course_id}

    axios
      .post("http://localhost:3000/courses/addsection", data)
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=> {
        console.log(err);
      })
  }

  return (
    <Row>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Título de la unidad </Form.Label>
            <Form.Control
              type="text"
              placeholder="Título de la unidad"
              value={newSection}
              onChange={handleChange}
            />
            <Button variant="outline-success"
              className="me-3" type="submit" >Aceptar</Button>
            <Button variant="outline-success"
              className="me-3" onClick={()=>setAddSection(false)}>Cancelar</Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};
