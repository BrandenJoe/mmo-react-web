import React from 'react';
import './index.css';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row row__column">
          <div className="footer__list">
            <a href="#" className="footer__link">Home</a>
            <a className="footer__link no-cursor">About</a>
            <a href="#features" className="footer__link">Games</a>
          </div>
          <div className="footer__copyright">Copyright &copy; 2024 Game Browser</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
