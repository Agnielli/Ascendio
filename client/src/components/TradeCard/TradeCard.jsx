import React from "react";
import { Card } from "react-bootstrap";

export const TradeCard = ({ elem }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        
        <Card.Title>{elem.nickname}</Card.Title>
        <Card.Text>Divisa: {elem.currency}</Card.Text>
        <Card.Text>Precio de entrada: {elem.entry_price}</Card.Text>
        <Card.Text>Parar pérdida: {elem.stop_loss}</Card.Text>
        <Card.Text>Beneficio: {elem.take_profit}</Card.Text>
        {elem.correct === null && <Card.Text>Estado: Pendiente de aprobación</Card.Text>}
        {elem.correct === 1 && <Card.Text>Estado: Acertado</Card.Text>}
        {elem.correct === 0 && <Card.Text>Estado: Errado</Card.Text>}
      </Card.Body>
    </Card>
  );
};
