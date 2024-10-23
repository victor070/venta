import React, { Component } from 'react'
import axios from 'axios'

export default class ListUsuarios extends Component {

  state = {
    usuarios: []
  }

  async componentDidMount() {
    const res = await axios.get('http://localhost:4000/api/usuarios');
    this.setState({ usuarios: res.data });
    console.log(this.state.usuarios);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center g-2">
          <div className="col">
          <div className="card border-primary">
              <div className="card-body">
                <h4 className="card-title">Nuevo usuario</h4>
                <p className="card-text">
                  
                </p>
              </div>
            </div>
          </div>
          <div class="col">
          <div className="card border-primary">
              <div className="card-body">
                <h4 className="card-title">Listado de usuarios</h4>
                <p className="card-text">
                  <ul className="list-group list-group-flush">
                    {
                      this.state.usuarios.map(usuarios => <li class="list-group-item" key={usuarios.idUsuario}>{usuarios.usuario}</li>)
                    }
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    )
  }
}
