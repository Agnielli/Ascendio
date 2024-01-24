import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ModalConfirmDeleteUser } from "./ModalConfirmDeleteUser/ModalConfirmDeleteUser";

export const ConfirmDeleteUser = ({ setShowDeleteUser }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <h2>Eliminar cuenta:</h2>
      <p>
        Estás a punto de eliminar tu cuenta y todos tus datos de Ascendio. Esta
        acción es irreversible. ¿Estás seguro de que deseas continuar?
      </p>
      <Button>aceptar</Button>
      <Button variant="primary me-2" onClick={() => setShowDeleteUser(false)}>
        cancelar
      </Button>

      <ModalConfirmDeleteUser>

      </ModalConfirmDeleteUser>

      
    </>
  );
};
