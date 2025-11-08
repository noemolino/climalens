import React from "react";
import { Link } from "react-router-dom";
// import './Navbar.scss'; // Stili

const Navbar = () => {
  return (
    <header>
      <div>
        <Link to="/">Home</Link>
        <Link to="/temperature">Temperature</Link>
        <Link to="/co2">CO2</Link>
        <Link to="/methane">Methane</Link>
        <Link to="/no2">NO2</Link>
        <Link to="/artic">Artic ice</Link>
        {/* Esempio: <Link to="/temperaturSe" className="text-white hover:text-blue-400 ml-6">Temperatura</Link> */}
      </div>
    </header>
  );
};

export default Navbar;
