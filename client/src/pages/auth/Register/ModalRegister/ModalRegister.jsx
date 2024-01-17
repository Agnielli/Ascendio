import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";

export const ModalRegister = ({ modal, setModal }) => {
  

  return (
    <Modal modal={modal} >
      <Modal.Header closeButton>
        <Modal.Title>CONFIRMACION DE CORREO</Modal.Title>
      </Modal.Header>
      <Modal.Body>VE A TU CORREO Y VALIDALO JODER</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" >
          Close
        </Button>
        <Button variant="primary">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
