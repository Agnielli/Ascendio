import axios from "axios";
import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export const ConfirmationUser = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  // const handleSubmit = () =>{
  //   axios
  //   .put(`http://localhost:3000/users/confirmationuser/${token}`)
  //   .then((res) => {
  //     console.log(res.data);
  //     navigate("/login");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }
  

  useEffect(() => {
    console.log(token);
    axios
      .put(`http://localhost:3000/users/confirmationuser/${token}`)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <h2>Su correo ha sido confirmado, bienvenido a Ascendio</h2>
        {/* <Button
          onClick={handleSubmit}
        >
          Aceptar
        </Button> */}
      </Col>
    </Row>
  );
};