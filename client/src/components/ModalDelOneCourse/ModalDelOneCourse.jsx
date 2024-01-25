import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

export const ModalDelOneCourse = ({
  showModalDelete,setShowModalDelete, deleteCourse,course_id}) => {

  const handleClose = () => {
    setShowModalDelete(false);
  };

  

  

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <Modal show={showModalDelete} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar curso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>
                  ¿Estás seguro que quieres eliminar el curso?{" "}
                </Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-success"
              className="me-3"
              onClick={() => deleteCourse(course_id)}
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
