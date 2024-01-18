import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ModalMailRevoverPassword = ({ showModal, setShowModal,email }) => {
  const navigate = useNavigate();

  return (
    <Modal show={showModal}>
      <Modal.Header>
        <Modal.Title>
          Solicitud de recuperación de contraseña aceptada
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Para continuar, revisa tu correo electronico: {email} .
        {/* Ver si es posible dejar el correo en forma de link para que te mande a outlook, gmail o lo que sea */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => navigate("/login")}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
