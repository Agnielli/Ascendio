import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export const FormAddTopic = ({ setShowTopic, course_id, sections, section_id }) => {
  const [newTopic, setNewTopic] = useState("");

  const handleChange = (e) => {
    setNewTopic(e.target.value);
  };

  const handleSubmit = () => {
    let data = { course_id, section_id, newTopic };

    console.log("data", data);
    
    if (newTopic !== "") {
      axios
        .post("http://localhost:3000/courses/addtopic", data)
        .then((res) => {
          console.log(res);
          setNewTopic(newTopic)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Row>
      <Col>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Título del tema</Form.Label>
            <Form.Control
              type="text"
              placeholder="Título del tema"
              value={newTopic}
              onChange={handleChange}
            />
            <Button
              variant="outline-success"
              className="me-3"
              onClick={handleSubmit}
            >
              Aceptar
            </Button>
            <Button
              variant="outline-success"
              className="me-3"
              onClick={() => setShowTopic(false)}
            >
              Cancelar
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};
