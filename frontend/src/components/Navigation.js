import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Configuracion from './Configuracion';

export default class Navigation extends Component {
  render() {
    return (

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Ventas</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                <Link className="nav-link active" to="/venta">Ventas</Link>
              </li>


              <Configuracion />

            </ul>
            
          </div>
        </div>
      </nav>
    );
  }
}