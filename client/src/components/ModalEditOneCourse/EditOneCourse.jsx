import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AscendioContext } from "../../context/AscendioContext";
import axios from "axios";

const initialValue = {
  title: "",
  description: "",
  price: "",
};

export const EditOneCourse = ({
  showModal,
  setShowModal,
  oneCoursePpal,
  setOneCoursePpal,
}) => {
  const { user } = useContext(AscendioContext);
  const course_id = useParams().course_id;
  const [file, setFile] = useState();
  const [editCourse, setEditCourse] = useState(initialValue);

  useEffect(() => {
    if (oneCoursePpal) {
      setEditCourse(oneCoursePpal);
    }
  }, [oneCoursePpal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCourse({ ...editCourse, [name]: value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append(
      "editarCurso",
      JSON.stringify({ ...editCourse, user_id: user.user_id })
    );
    formData.append("file", file);
    axios
      .put(`http://localhost:3000/courses/editcourse/${course_id}`, formData)
      .then((res) => {
        console.log(res);
        setShowModal(false);
        setOneCoursePpal(editCourse);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                  value={editCourse?.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Descripción </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripción"
                  name="description"
                  value={editCourse?.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Precio </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="€"
                  name="price"
                  value={editCourse?.price}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
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
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
};
