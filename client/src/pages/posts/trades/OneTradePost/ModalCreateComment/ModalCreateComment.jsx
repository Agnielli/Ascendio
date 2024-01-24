import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../../../context/AscendioContext";
import axios from "axios";

const initialValue = {
  message: "",
};

export const ModalCreateComment = ({ showModal, setShowModal, oneTrade }) => {
  const [comment, setComment] = useState(initialValue);
  const { user } = useContext(AscendioContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...comment, [name]: value });
  };

  const handleSubmit = () => {
    setShowModal(false);
    axios
      .post()
      .then((res) => {
        console.log(res);
        navigate(`/onetradepost/${oneTrade.post_id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal show={showModal}>
      <Modal.Header>
        <Modal.Title>Añadir comentario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupText">
            <Form.Label>Exprésate</Form.Label>
            <Form.Control
              type="text"
              placeholder="¿Que quieres decir?"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Aceptar
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/OneTradePost/1");
            setShowModal(false);
          }}
        >
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
