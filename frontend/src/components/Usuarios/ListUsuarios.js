import React, { Component } from 'react';
import axios from 'axios'; //generar llamadas a la api
import Swal from 'sweetalert2'; // Importar SweetAlert2
import $ from 'jquery';
import 'datatables.net-bs5'; // DataTables con Bootstrap 5
import 'datatables.net-buttons-bs5'; // Botones de DataTables para Bootstrap 5
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import jszip from 'jszip';
// Para exportación de tabla
window.JSZip = jszip;


export default class ListUsuarios extends Component {

  state = {
    usuarios: [],
    usuario: '',
    clave: '',
    vigente: false, // Estado para manejar si el usuario está vigente
    editando: false, // Estado para controlar si se está editando
    idUsuarioEdit: null // Almacenar el ID del usuario que se está editando
  }

  // Obtener usuarios al cargar el componente
  componentDidMount = async () => {
    await this.getUsuarios();
    await this.inicializarDataTable();
  };

  componentDidUpdate(prevProps, prevState) {
    // Solo inicializa el DataTable si los usuarios han cambiado
    if (prevState.usuarios !== this.state.usuarios) {
      this.inicializarDataTable();
    }
  }

  componentWillUnmount() {
    // Asegúrate de destruir el DataTable al desmontar el componente
    if ($.fn.dataTable.isDataTable('#tablaUsuarios')) {
      $('#tablaUsuarios').DataTable().destroy(true); // Usa el parámetro true para eliminar el DOM relacionado con el DataTable
    }
  }

  // Función para obtener la lista de usuarios
  getUsuarios = async () => {
    const res = await axios.get('http://localhost:4000/api/usuarios');
    this.setState({ usuarios: res.data });
  };

  inicializarDataTable = () => {

    // Inicializar DataTable con botones
    $('#tablaUsuarios').DataTable({
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'excelHtml5',
          text: 'Exportar a Excel',
          title: 'Listado de Usuarios'
        },
        {
          extend: 'csvHtml5',
          text: 'Exportar a CSV',
          title: 'Listado de Usuarios'
        },
        {
          extend: 'pdfHtml5',
          text: 'Exportar a PDF',
          title: 'Listado de Usuarios'
        },
        {
          extend: 'print',
          text: 'Imprimir',
          title: 'Listado de Usuarios'
        }
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
      }
    });
  };

  // Métodos de manejo de cambios en inputs
  onchangeName = (e) => {
    this.setState({ usuario: e.target.value });
  };

  onchangePass = (e) => {
    this.setState({ clave: e.target.value });
  };

  onchangeVigente = (e) => {
    this.setState({ vigente: e.target.checked });
  };

  // Manejo del formulario de envío
  onSubmit = async (e) => {
    e.preventDefault();

    if (this.state.editando) {
      await axios.put(`http://localhost:4000/api/usuarios/${this.state.idUsuarioEdit}`, {
        usuario: this.state.usuario,
        clave: this.state.clave,
        vigente: this.state.vigente
      });

      Swal.fire({
        title: 'Usuario Actualizado',
        text: 'Los cambios han sido guardados correctamente!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

    } else {
      await axios.post('http://localhost:4000/api/usuarios', {
        usuario: this.state.usuario,
        clave: this.state.clave,
        vigente: this.state.vigente
      });

      Swal.fire({
        position: "top-end",
        title: 'Usuario: ' + this.state.usuario + ' Guardado',
        text: 'El usuario ha sido registrado con éxito!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
    }

    this.setState({ usuario: '', clave: '', vigente: false, editando: false, idUsuarioEdit: null });

    this.getUsuarios(); // Volver a cargar la lista de usuarios
  };

  updateUser = async (id) => {
    const res = await axios.get(`http://localhost:4000/api/usuarios/${id}`);
    this.setState({
      usuario: res.data.usuario,
      clave: res.data.clave,
      vigente: res.data.vigente,
      editando: true,
      idUsuarioEdit: id
    });
  };


  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center g-2">
          <div className="col">
            <div className="card border-primary">
              <div className="card-body">
                <h4 className="card-title">{this.state.editando ? 'Editar usuario' : 'Nuevo usuario'}</h4>

                <form onSubmit={this.onSubmit}>
                  <div className="form-group mb-3">
                    <label className="form-label">Usuario</label>
                    <input type="text"
                      className="form-control"
                      onChange={this.onchangeName}
                      value={this.state.usuario}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Password</label>
                    <input type="password"
                      className="form-control"
                      onChange={this.onchangePass}
                      value={this.state.clave}
                    />
                  </div>

                  {/* Mostrar el checkbox solo cuando estamos editando */}
                  {this.state.editando && (
                    <div className="form-group mb-3">
                      <label className="form-label">
                        <input type="checkbox"
                          checked={this.state.vigente}
                          onChange={this.onchangeVigente}
                        />
                        &nbsp; Usuario vigente
                      </label>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary">{this.state.editando ? 'Actualizar' : 'Guardar'}</button>
                </form>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card border-primary">
              <div className="card-body">
                <h4 className="card-title">Listado de usuarios</h4>
                <table id="tablaUsuarios" className="display table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Vigente</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.usuarios.map(usuario => (
                        <tr key={usuario.idUsuario}>
                          <td>{usuario.usuario}</td>
                          <td>{usuario.vigente ? 'Sí' : 'No'}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={() => this.updateUser(usuario.idUsuario)}
                            >
                              Editar
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
