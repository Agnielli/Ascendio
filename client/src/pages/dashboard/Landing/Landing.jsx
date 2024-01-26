import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../Landing/Landing.scss";
import { TradingViewWidget } from "./TradingViewWidget/TradingViewWidget";
import { Container } from "react-bootstrap";

export const Landing = () => {
  return (
    <Container fluid className="ascendio-landing-containerPrincipal">
      <main className="ascendio-landing-main">
        <TradingViewWidget />
      </main>
      <footer className="ascendio-landing-footer">
        <h3 className="col-xl-5">ASCENDIO</h3>
        <p className="col-xl-2">&copy;2024 Ascendio, inc</p>
        <Link className="ascendio-landing-footer-link col-xl-2" to="/termsandconditions">
          Therms & Conditions
        </Link>
        <Link className="ascendio-landing-footer-link col-xl-1" to="/privacy">
          Privacy
        </Link>
        <Link className="ascendio-landing-footer-link col-xl-2" to="/cookiespolicy">
          Cookies Policy
        </Link>
      </footer>
    </Container>
  );
};
