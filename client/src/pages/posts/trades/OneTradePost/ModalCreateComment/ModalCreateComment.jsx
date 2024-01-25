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
  console.log(user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({ [name]: value });
  };

  const handleSubmit = () => {
    console.log(oneTrade);
    console.log(comment);
    axios
      .post("http://localhost:3000/comments/createcomment", {
        comment,
        oneTrade,
        user,
      })
      .then((res) => {
        console.log(res);
        setShowModal(false);
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
              name="message"
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
            setShowModal(false);
          }}
        >
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
