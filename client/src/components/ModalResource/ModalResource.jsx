import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import './modalResource.scss'
import "../../../public/stylesheets/ButtonsApp.scss";

export const ModalResource = ({
  showModalArchivo,
  setShowModalArchivo,
  setResetCourse,
  resetCourse,
  section_id,
  topic_id
}) => {
  const [contenido, setContenido] = useState(null);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState();

  const course_id = useParams().course_id

  const handleClose = () => {
    setShowModalArchivo(false);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => { 
    setUrl(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    let data = { course_id, section_id, topic_id, url };
    
    newFormData.append("crearContenido", JSON.stringify(data));
    newFormData.append("file", file);

    axios
      .post(`http://localhost:3000/courses/addresourcepdf`, newFormData)
      .then((res) => {
        console.log('PPPPPPPPP', res.data);
        setResetCourse(!resetCourse)
        setUrl(""); 
        handleClose()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <Modal show={showModalArchivo} onHide={handleClose}>
          <Modal.Header closeButton className="modalResource">
            <Modal.Title>Añadir contenido</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalResource">
          <div className="d-flex ">
            <Button
              onClick={() => {
                setContenido("1");
              }}
              className="Button4"
            >
              PDF
            </Button>
            <Button
              onClick={() => {
                setContenido("2");
              }}
              className="Button4"
            >
              Video
            </Button>
            </div>

            {contenido === "1" ? (
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="file"
                  onChange={handleFile}
                  accept="pdf"
                />
              </Form.Group>
            ) : null}

            {contenido === "2" ? (
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="text"
                  value={url}
                  onChange={handleChange}
                />
              </Form.Group>
            ) : null}
          </Modal.Body>
          <Modal.Footer className="modalResource">
            <Button
              className="Button3"
              onClick={handleSubmit}
            >
              Aceptar
            </Button>

            <Button
              className="Button3"
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
