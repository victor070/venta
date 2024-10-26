const db = require('../database');

const ventasCtrl = {};

ventasCtrl.getVentas = (req, res) => {
  const sql = 'select * from productos as p inner join categorias as c ON p.FK_codigoCategoria = c.codigoCategoria where c.vigente = 1';
  db.query(sql, (err, results) => {
      if (err) {
          res.status(500).send('Error retrieving users');
      } else {
          res.json(results);
      }
  })
};

ventasCtrl.postVentas = (req, res) => {
  const { fechaVenta, formaPago, numeroFactura, idCliente, idPago, idTipoPago, detalles, pagos } = req.body; // Recibimos los datos de la venta

  // Validar que los campos requeridos no estén vacíos
  if (!fechaVenta || !formaPago || !numeroFactura || !idCliente || !idPago || !idTipoPago || !detalles || !pagos) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Consulta SQL para llamar al procedimiento almacenado
  const sql = 'CALL GenerarVenta(?, ?, ?, ?, ?, ?, ?, ?)';

  // Ejecutar la consulta SQL para llamar al procedimiento almacenado
  db.query(sql, [fechaVenta, formaPago, numeroFactura, idCliente, idPago, idTipoPago, JSON.stringify(detalles), JSON.stringify(pagos)], (err, results) => {
    if (err) {
      console.error(err);  // Para que se registre en la consola el error exacto
      return res.status(500).json({ message: 'Error al agregar la venta' });
    } else {
      const ventaGenerada = results[0][0];  // Asumiendo que el procedimiento devuelve el ID de la venta generada
      res.status(201).json({ message: 'Venta creada exitosamente', idVenta: ventaGenerada.ventaGenerada });
    }
  });
};


module.exports = ventasCtrl;