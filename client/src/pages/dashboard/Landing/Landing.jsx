import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import "../Landing/Landing.scss";
import { TradingViewWidget } from "./TradingViewWidget/TradingViewWidget";

export const Landing = () => {
  return (
    <Container fluid className="ascendio-landing-containerPrincipal">
      <Row className="ascendio-landing-main">
        {" "}
        <Col xl={6} xs={12} sm={12} className="ascendio-landing-main-hijo">
          <img
            className="ascendio-landing-fondo-principal1"
            src="/images/landing/fondo.png"
            alt=""
          />
        </Col>
        <Col xl={6} xs={12} sm={12} className="ascendio-landing-main-hijo">
          <img
            src="/images/landing/fondo2.PNG"
            alt=""
            className="ascendio-landing-fondo-principal2"
          />
        </Col>
        <Col xl={6} sm={12} xs={12} className="ascendio-landing-main-hijo2 ">
          <Row className="ascendio-landing-textos-padre">
            <Col xl={3} sm={6} className="ascendio-landing-textos-hijo">
              <img
                src="/images/landing/icono-movil.PNG"
                alt="Imagen de un movil"
              />
              <h6>Multiplataforma</h6>
              <p>Sigue a tus trades favoritos desde cualquier dispositivo.</p>
            </Col>
            <Col xl={3} sm={6} className="ascendio-landing-textos-hijo">
              <img
                src="/images/landing/iconoChat.PNG"
                alt="Imagen de un movil"
              />
              <h6>Canales públicos</h6>
              <p>Canales grauitos y de pago, todos a un solo click.</p>
            </Col>
            <Col xl={3} sm={4} className="ascendio-landing-textos-hijo">
              <img
                src="/images/landing/iconoEstadisticas.PNG"
                alt="Imagen de un movil"
              />
              <h6>Estadísticas</h6>
              <p>Estadísticas verificadas por nuestro equipo.</p>
            </Col>
            <Col xl={3} sm={4} className="ascendio-landing-textos-hijo">
              <img
                src="/images/landing/historial.PNG"
                alt="Imagen de un movil"
              />
              <h6>Historial</h6>
              <p>De todas las operaciones realizadas por nuestros trades.</p>
            </Col>
            <Col xl={3} sm={4} className="ascendio-landing-textos-hijo">
              <img src="/images/landing/timbre.png" alt="Imagen de un movil" />
              <h6>Notificaciones</h6>
              <p>Notificaciones completamente personalizables.</p>
            </Col>
            <Col xl={3} sm={4} className="ascendio-landing-textos-hijo">
              <img src="/images/landing/ranking.PNG" alt="Imagen de un movil" />
              <h6>Rankings</h6>
              <p>Rankings ajustados y actualizados al minuto.</p>
            </Col>
          </Row>
        </Col>
        <Col
          xl={6}
          sm={12}
          className="ascendio-landing-main-hijo3 col-xl-6 col-12"
        >
          <TradingViewWidget />
        </Col>
      </Row>
      <Row className="ascendio-landing-footer">
        <Col xs={5} xl={5} className="col-landin-footer-estyles">
          <h3>ASCENDIO</h3>
        </Col>
        <Col xs={2} xl={2} className="col-landin-footer-estyles">
          <p>&copy;2024 Ascendio, inc</p>
        </Col>
        <Col xs={2} xl={2} className="col-landin-footer-estyles">
          <Link
            className="ascendio-landing-footer-link "
            to="/termsandconditions"
          >
            Therms & Conditions
          </Link>
        </Col>
        <Col xs={1} xl={1} className="col-landin-footer-estyles">
          <Link className="ascendio-landing-footer-link" to="/privacy">
            Privacy
          </Link>
        </Col>
        <Col xs={2} xl={2} className="col-landin-footer-estyles">
          <Link className="ascendio-landing-footer-link" to="/cookiespolicy">
            Cookies Policy
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
