import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Configuracion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="nav-item dropdown">
      <button 
        className="nav-link dropdown-toggle" 
        type="button"
        aria-expanded={isOpen ? "true" : "false"} 
        onClick={toggleDropdown}
      >
        Configuración
      </button>
      <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
        <li> <Link className="dropdown-item" to="/usuarios">Usuarios</Link></li>
        <li> <Link className="dropdown-item" to="/bancos">Bancos</Link></li>
        <li> <Link className="dropdown-item" to="/proveedores">Proveedores</Link></li>
      </ul>
    </li>
  );
};

export default Configuracion;

