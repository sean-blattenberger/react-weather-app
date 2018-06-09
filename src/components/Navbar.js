import React from "react";


const Navbar = () => {
  return (
    <nav className="light-blue darken-1">
      <div className="nav-wrapper container">
        <a
          id="logo-container"
          href="/"
          className="brand-logo center orange-text condensed light thin"
        >
          WeatherApp
        </a>
        <button data-target="modal1" className="btn modal-trigger orange">About</button>
      </div>
    </nav>
  );
};

export default Navbar;
