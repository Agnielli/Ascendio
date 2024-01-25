import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { CardSection } from "../CardSection/CardSection";
import { prueba } from "../Prueba/prueba";

export const ModalResource = ({ showModalArchivo, setShowModalArchivo }) => {
  const [contenido, setContenido] = useState(null);

  const handleClose = () => {
    setShowModalArchivo(false);
  };

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <Modal show={showModalArchivo} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Añadir contenido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              onClick={() => {
                setContenido('1');
              }}
            >
              PDF/JPG
            </Button>
            <Button
              onClick={() => {
                setContenido('2');
              }}
            >
              Video
            </Button>

            {contenido === '1' ? 
            <p>hola</p> 
            : 
            null}
            
            {contenido === '2' ? <p>Adios</p> : null}
            

          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" className="me-3">
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
