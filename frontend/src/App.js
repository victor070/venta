import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//importacion de componentes 
import Navigation from './components/Navigation'
import ListUsuarios from './components/Usuarios/ListUsuarios'
import CreateUsuario from './components/Usuarios/CreateUsuario'
import Configuracion from './components/Configuracion'

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes> {/* Envuelve las rutas dentro de <Routes> */}
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
