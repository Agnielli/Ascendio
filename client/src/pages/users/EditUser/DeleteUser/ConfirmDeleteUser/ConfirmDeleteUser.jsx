import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../../../context/AscendioContext";
import { delLocalStorage } from "../../../../../helpers/localStorageUtils";

export const ConfirmDeleteUser = ({ setShowDeleteUser}) => {
  const { user, token, setUser, setToken, setIsLogged } =
    useContext(AscendioContext);  
  const navigate = useNavigate();

  const logOut = () => {
    delLocalStorage("token");
    setUser();
    setToken();
    setIsLogged(false);
    navigate("/");
  };

  const userData = {
    email: user.email,
    nickname: user.nickname,
  };
  
  
  const handleSubmit = () => {
      axios
        .put(`http://localhost:3000/users/deleteuser/${user.user_id}`, userData)
        .then((res) => {
          logOut()
          
        })
        .catch((err) => console.log(err));
    
  };
  
    

  
  return (
    <div className="FormularioDatosUsuario">
      <h2>Eliminar cuenta:</h2>
      <p>
        Estás a punto de eliminar tu cuenta y todos tus datos de Ascendio. Esta
        acción es irreversible. ¿Estás seguro de que deseas continuar?
      </p>
      <div className="DivGrisParaBotones d-flex justify-content-between mt-3 mb-1">
        <Button className="Button3" onClick={handleSubmit}>aceptar</Button>
        <Button className="Button1" variant="primary me-2" onClick={() => setShowDeleteUser(false)}>
          cancelar
        </Button>
      </div>

      
    </div>
  );
};
