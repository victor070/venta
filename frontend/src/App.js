import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//importacion de componentes 
import Navigation from './components/Navigation';
import ListUsuarios from './components/Usuarios/ListUsuarios';
import CreateUsuario from './components/Usuarios/CreateUsuario';
import Configuracion from './components/Configuracion';
import CrearVenta from './components/Ventas/CreateVenta';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container-fluid p-4">
        <Routes> {/* Envuelve las rutas dentro de <Routes> */}
          <Route path='/ventas' element={<CrearVenta />} />
          <Route path='/usuarios' element={<ListUsuarios />} />
          <Route path='/crearusuarios' element={<CreateUsuario />} />
          <Route path='/editusuario/:id' element={<CreateUsuario />} />
          <Route path='/configuracion' element={<Configuracion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
