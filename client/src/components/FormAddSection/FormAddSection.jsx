import React from "react";
import "./formAddSection.scss";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const FormAddSection = ({addSection, setAddSection,course_id}) => {

  const [newSection, setNewSection] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) =>{
    setNewSection(e.target.value)
  }

  const handleSubmit = () =>{
    //const newFormData = new FormData()
    //newFormData.append("section", JSON.stringify(newSection))
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
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Título de la unidad </Form.Label>
            <Form.Control
              type="text"
              placeholder="Título de la unidad"
              value={newSection}
              onChange={handleChange}
            />
            <Button variant="outline-success"
              className="me-3" onClick={handleSubmit}>Aceptar</Button>
            <Button variant="outline-success"
              className="me-3" onClick={()=>setAddSection(false)}>Cancelar</Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};
