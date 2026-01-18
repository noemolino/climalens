import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../images/ClimaLens.png";

const Navbar = () => {
  // State to manage opening/closing of mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (path) => location.pathname === path;

  // Function to close menu after clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Function to toggle hamburger button click
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="climalens-header">
      {/* Logo/Home Link Section */}
      <div className="logo-container">
        <Link to="/" className="logo-container-link" onClick={handleLinkClick}>
          <img src={logo} alt="Logo" className="logo-container-img"/>
          <h1 className="logo-container-title">Clima<i>Lens</i></h1>
        </Link>
      </div>

      {/* Hamburger Button (visible only on mobile) */}
      <button
        className={`hamburger-button ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>

      <nav
        className={`header-nav ${isMenuOpen ? "open" : ""}`}
        id="mobile-menu"
      >
        <Link
          to="/"
          className={isActive("/") ? "active" : ""}
          onClick={handleLinkClick}
        >
          Home
        </Link>
        <Link
          to="/temperature"
          className={isActive("/temperature") ? "active" : ""}
          onClick={handleLinkClick}
        >
          Temperature
        </Link>
        <Link
          to="/co2"
          className={isActive("/co2") ? "active" : ""}
          onClick={handleLinkClick}
        >
          CO₂
        </Link>
        <Link
          to="/methane"
          className={isActive("/methane") ? "active" : ""}
          onClick={handleLinkClick}
        >
          Methane
        </Link>
        <Link
          to="/no2"
          className={isActive("/no2") ? "active" : ""}
          onClick={handleLinkClick}
        >
          NO₂
        </Link>
        <Link
          to="/artic"
          className={isActive("/artic") ? "active" : ""}
          onClick={handleLinkClick}
        >
          Arctic Ice
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
