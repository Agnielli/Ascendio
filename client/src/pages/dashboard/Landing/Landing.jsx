import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../Landing/Landing.scss";
import { TradingViewWidget } from "./TradingViewWidget/TradingViewWidget";

export const Landing = () => {
  return (
    <div className="ascendio-landing-containerPrincipal">
      <h2>Landing</h2>
      <TradingViewWidget />
      <footer className="ascendio-landing-footer">
        <h3>ASCENDIO</h3>
        <p> &copy; 2024 Ascendio, inc</p>

        <Link to="/termsandconditions">Therms & Conditions</Link>

        <Link to="/privacy">Privacy</Link>

        <Link to="/cookiespolicy">Cookies Policy</Link>
      </footer>
    </div>
  );
};
