import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="climalens-footer">
      <div className="climalens-footer__title">Clima<i>Lens</i></div>
      <div className="climalens-footer__text">
        Data provided by global-warming.org
      </div>
      <div className="climalens-footer__copy">
        © 2025 ClimaLens
      </div>
    </footer>
  );
};

export default Footer;
