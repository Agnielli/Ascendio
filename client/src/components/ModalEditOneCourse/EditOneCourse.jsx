import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Button,
  DropdownButton,
  InputGroup,
  Dropdown,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
/* import "./createCourse.scss"; */
import { useNavigate, useParams } from "react-router-dom";
import { AscendioContext } from "../../context/AscendioContext";
import axios from "axios";
import Select from "react-select";

export const EditOneCourse = ({ showModal, setShowModal, oneCoursePpal, setOneCoursePpal }) => {
  
  // const { courses, setCourses } = useContext(AscendioContext)
  const course_id = useParams().course_id;

   const handleChange = (e) => {
    const { name, value } = e.target;
    setOneCoursePpal({...oneCoursePpal, [name]: value})
  };

  const handleFile = () => {};

  const handleClose = () =>{
    setShowModal(false)
  }

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar curso</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>.jpg/.pdf</Form.Label>
                <Form.Control type="file" onChange={handleFile} hidden />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Título </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Titulo"
                  name="title"
                  value={oneCoursePpal?.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Descripción </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripción"
                  name="description"
                  value={oneCoursePpal?.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Precio </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="€"
                  name="price"
                  value={oneCoursePpal?.price}
                  onChange={handleChange}
                />
              </Form.Group>
              </Form>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" className="me-3">
                Aceptar
              </Button>
              <Button
                variant="outline-success"
                className="me-3"
                onClick={()=>handleClose(false)}
                >
                Cancelar
              </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
};
