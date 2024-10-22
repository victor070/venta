import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//importacion de componentes 
import Navigation from './components/Navigation';
import ListUsuarios from './components/Usuarios/ListUsuarios';
import CreateUsuario from './components/Usuarios/CreateUsuario'

function App() {
  return (
    <Router>

      <Navigation />
      <Route path='/usuarios' component={ListUsuarios} />
      <Route path='/crear' component={CreateUsuario} />

    </Router>
  );
}

export default App;
