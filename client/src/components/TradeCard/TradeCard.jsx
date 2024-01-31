import React from "react";
import "./TradeCard.scss";

export const TradeCard = ({ elem }) => {
  return (
    <div className="TradeDiv align-items-center text-center">
      <img
        src={
          elem.img != null
            ? `http://localhost:3000/images/users/${elem.img}`
            : `http://localhost:3000/images/users/descarga.png`
        }
        alt="Imagen de perfil del usuario"
      />
      <div className="text-start mt-4">
        <h5 className="text-center mb-4">{elem.nickname}</h5>
        <p>Divisa: {elem.currency}</p>
        <p>Precio de entrada: {elem.entry_price}</p>
        <p>Parar pérdida: {elem.stop_loss}</p>
        <p>Beneficio: {elem.take_profit}</p>
        {elem.correct === null && <p>Estado: Pendiente</p>}
        {elem.correct === 1 && <p>Estado: Acertado</p>}
        {elem.correct === 0 && <p>Estado: Errado</p>}
      </div>
    </div>
  );
};
