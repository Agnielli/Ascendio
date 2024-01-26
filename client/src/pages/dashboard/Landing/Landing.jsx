import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../Landing/Landing.scss";
import { TradingViewWidget } from "./TradingViewWidget/TradingViewWidget";
import { Container } from "react-bootstrap";

export const Landing = () => {
  return (
    <Container fluid className="ascendio-landing-containerPrincipal">
      <main className="ascendio-landing-main row">
        {" "}
        <div className="col-12 col-xl-6 ascendio-landing-main-hijo">
          <img
            className="ascendio-landing-fondo-principal1"
            src="/images/landing/fondo.png"
            alt=""
          />
        </div>
        <div className="col-12 col-xl-6 ascendio-landing-main-hijo">
          <img
            src="/images/landing/fondo2.PNG"
            alt=""
            className="ascendio-landing-fondo-principal2"
          />
        </div>
        <div className="col-12 ascendio-landing-main-hijo2 col-xl-6">
          <div className="row ascendio-landing-textos-padre">
            <div className="col-6 col-xl-3 ascendio-landing-textos-hijo">
              <img
                src="/images/landing/icono-movil.PNG"
                alt="Imagen de un movil"
              />
              <h6>Multiplataforma</h6>
              <p>Sigue a tus trades favoritos desde cualquier dispositivo.</p>
            </div>
            <div className="col-4 col-xl-3 ascendio-landing-textos-hijo">
              <img
                src="/images/landing/iconoChat.PNG"
                alt="Imagen de un movil"
              />
              <h6>Canales públicos</h6>
              <p>Canales grauitos y de pago, todos a un solo click.</p>
            </div>
            <div className="col-4 col-xl-3 ascendio-landing-textos-hijo">
              <img
                src="/images/landing/iconoEstadisticas.PNG"
                alt="Imagen de un movil"
              />
              <h6>Estadísticas</h6>
              <p>Estadísticas verificadas por nuestro equipo.</p>
            </div>
            <div className="col-4 col-xl-3 ascendio-landing-textos-hijo">
              <img
                src="/images/landing/historial.PNG"
                alt="Imagen de un movil"
              />
              <h6>Historial</h6>
              <p>De todas las operaciones realizadas por nuestros trades.</p>
            </div>
            <div className="col-4 col-xl-3 ascendio-landing-textos-hijo">
              <img src="/images/landing/timbre.png" alt="Imagen de un movil" />
              <h6>Notificaciones</h6>
              <p>Notificaciones completamente personalizables.</p>
            </div>
            <div className="col-4 col-xl-3 ascendio-landing-textos-hijo">
              <img src="/images/landing/ranking.PNG" alt="Imagen de un movil" />
              <h6>Rankings</h6>
              <p>Rankings ajustados y actualizados al minuto.</p>
            </div>
          </div>
        </div>
        <div className="ascendio-landing-main-hijo col-xl-6 col-12">
          <TradingViewWidget />
        </div>
      </main>
      <footer className="ascendio-landing-footer row">
        <h3 className="col-xl-5">ASCENDIO</h3>
        <p className="col-xl-2">&copy;2024 Ascendio, inc</p>
        <Link
          className="ascendio-landing-footer-link col-xl-2"
          to="/termsandconditions"
        >
          Therms & Conditions
        </Link>
        <Link className="ascendio-landing-footer-link col-xl-1" to="/privacy">
          Privacy
        </Link>
        <Link
          className="ascendio-landing-footer-link col-xl-2"
          to="/cookiespolicy"
        >
          Cookies Policy
        </Link>
      </footer>
    </Container>
  );
};
