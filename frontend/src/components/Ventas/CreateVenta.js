import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';

export default class CreateVenta extends Component {
    state = {
        productos: [],
        productoSeleccionado: '',
        cantidad: 1,
        detalleFactura: [],
        clientes: [],
        clienteSeleccionado: ''
    };

    // Función para obtener la lista de clientes
    getClientes = async () => {
        const res = await axios.get('http://localhost:4000/api/clientes');
        this.setState({ clientes: res.data });
        this.inicializarClientesSelect2();
    };

    // Función para obtener la lista de productos
    getProductos = async () => {
        const res = await axios.get('http://localhost:4000/api/productos');
        this.setState({ productos: res.data });
        this.inicializarProductosSelect2();
    };

    // Inicializa Select2 para productos
    inicializarProductosSelect2 = () => {
        $(this.productoSelectRef).select2({
            placeholder: 'Selecciona un producto',
            data: this.state.productos.map(producto => ({
                id: producto.codigoProducto,
                text: producto.descripcion
            }))
        });

        $(this.productoSelectRef).on('select2:select', (e) => {
            this.setState({ productoSeleccionado: e.params.data.id });
        });
    };

    // Inicializa Select2 para clientes
    inicializarClientesSelect2 = () => {
        $(this.clienteSelectRef).select2({
            placeholder: 'Selecciona un cliente',
            data: this.state.clientes.map(cliente => ({
                id: cliente.idCliente,
                text: `${cliente.nombre} (NIT: ${cliente.nit})`
            }))
        });

        $(this.clienteSelectRef).on('select2:select', (e) => {
            this.setState({ clienteSeleccionado: e.params.data.id });
        });
    };

    // Obtener productos y clientes al cargar el componente
    componentDidMount = async () => {
        await this.getProductos();
        await this.getClientes();
    };

    // Función para agregar el producto al detalle de la factura
    agregarProducto = () => {
        const { productos, productoSeleccionado, cantidad } = this.state;
        const producto = productos.find(p => p.codigoProducto === parseInt(productoSeleccionado));

        if (producto) {
            const detalle = {
                descripcion: producto.descripcion,
                cantidad,
                precioUnitario: producto.precioUnitario
            };

            this.setState(prevState => ({
                detalleFactura: [...prevState.detalleFactura, detalle],
                productoSeleccionado: '',
                cantidad: 1
            }));

            $(this.inicializarProductosSelect2).val(null).trigger('change'); // Reiniciar Select2
        }
    };

    render() {
        return (
            <div className="container-fluid">
                <h3>Nueva Venta</h3>
                <div className="row justify-content-center align-items-center g-2">
                    <div className="col">
                        <div className="card border-primary">
                            <div className="card-body">
                                <h4 className="card-title">Selecciona Cliente</h4>
                                <div className="form-group">
                                    <label>Cliente</label>
                                    <select
                                        className="form-control"
                                        ref={(ref) => { this.clienteSelectRef = ref; }}
                                    >
                                        <option disabled selected>Seleciona un Cliente</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="card border-primary">
                            <div className="card-body">
                                <h4 className="card-title">Productos</h4>
                                <div className="form-group">
                                    <label>Producto</label>
                                    <select
                                        className="form-control"
                                        ref={(ref) => { this.productoSelectRef = ref; }}
                                    >
                                        <option disabled selected>Seleciona un producto</option>
                                    </select>
                                </div>
                                <div className="form-group mt-2">
                                    <label>Cantidad</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={this.state.cantidad}
                                        onChange={(e) => this.setState({ cantidad: e.target.value })}
                                        min="1"
                                    />
                                </div>
                                <button
                                    className="btn btn-success mt-3"
                                    onClick={this.agregarProducto}
                                >
                                    Agregar al detalle
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Card para el detalle de la factura */}
                    <div className="col">
                        <div className="card border-primary">
                            <div className="card-body">
                                <h4 className="card-title">Detalle de la factura</h4>
                                <table id="tablaDetalle" className="display table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio Unitario</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.detalleFactura.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.descripcion}</td>
                                                <td>{item.cantidad}</td>
                                                <td>{item.precioUnitario}</td>
                                                <td>{(item.cantidad * item.precioUnitario).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer text-body-secondary">
                                <div className="row justify-content-center align-items-center g-2">
                                    <div className="col">
                                        <div className="d-grid gap-2">
                                            <button type="button" className="btn btn-primary">
                                                Guardar
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col text-end">
                                        Total : <span>{this.state.detalleFactura.reduce((total, item) => total + item.cantidad * item.precioUnitario, 0).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
