import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="nav__container">
          <i className="fa-solid fa-gamepad"></i>
          <ul className="nav__links">
            <li>
              <a href="#" title="Back to Menu" className="nav__link">Home</a>
            </li>
            <li>
              <a href="#" className="nav__link">Contact</a>
            </li>
            <li>
              <a href="#" className="nav__link nav__link--primary">Games</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

