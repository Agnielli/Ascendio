import React, { useContext, useState } from "react";
import "./login.scss";
import { Button, Col, Form, Row } from "react-bootstrap";
import { AscendioContext } from "../../../context/AscendioContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { saveLocalStorage } from "../../../helpers/localStorageUtils";

const initialValue = {
  email: "",
  password: "",
};

export const Login = () => {
  const { setUser, setToken, setIsLogged } = useContext(AscendioContext);
  const [login, setLogin] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/users/loginuser", login)
      .then((res) => {
        setIsLogged(true);
        setUser(res.data.user);
        setToken(res.data.token);
        saveLocalStorage("token", res.data.token);

        const type = res.data.user.type;
        if (type === 1) {
          navigate("/admin");
        } else if (type === 2) {
          navigate("/home");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setMsgError(err.response.data);
      });
  };

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <Form>
        <h3>Login</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              //login.email
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              //login.password
            />
          </Form.Group>
          <p>{msgError}</p>
          <Button  className="me-3" variant="outline-success" onClick={handleSubmit}>
            Aceptar
          </Button>
          <Button onClick={() => navigate("/")} variant="outline-success">
            Cancelar
          </Button>
          <p>
            ¿Aún no estás registrado? <Link to="/register">Registrate</Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
};
