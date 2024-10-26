const db = require('../database');

const ventasCtrl = {};

ventasCtrl.getClientes = (req, res) => {
  const sql = 'select * from clientes';
  db.query(sql, (err, results) => {
      if (err) {
          res.status(500).send('Error retrieving users');
      } else {
          res.json(results);
      }
  })
};

ventasCtrl.postUsuarios = (req, res) => {
  const { usuario, clave } = req.body; // Recibimos los datos del cliente

  // Validar que los campos requeridos no estén vacíos
  if (!usuario || !clave ) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Consulta SQL para insertar un nuevo usuario
  const sql = 'INSERT INTO usuarios (usuario, clave) VALUES (?, ?)';

  // Ejecutar la consulta SQL
  db.query(sql, [usuario, clave], (err, results) => {
      if (err) {
          return res.status(500).send('Error adding user');
      } else {
          res.status(201).json({ message: 'Usuario creado exitosamente', id: results.insertId });
      }
  });
};

// Método para obtener un usuario por su id
ventasCtrl.getUsuariosById = (req, res) => {
  const { id } = req.params; // Extraer el idUsuario desde los parámetros de la URL

  // Validar que el id sea un número
  if (isNaN(id)) {
    return res.status(400).json({ message: 'El ID debe ser un número válido' });
  }

  // Consulta SQL para  obtenerel usuario por idUsuario
  const sql = 'SELECT * FROM usuarios WHERE idUsuario = ?';
  
  // Ejecutar la consulta SQL
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving user');
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(results[0]); // Devolver el primer (y único) resultado como JSON
  });
};

// Método para actualizar un usuario por su idUsuario
ventasCtrl.putUsuariosById = (req, res) => {
  const { id } = req.params; // Extraer el idUsuario desde los parámetros de la URL
  const { usuario, clave, vigente } = req.body; // Recibimos los datos del cliente
  
  // Validar que el id sea un número
  if (isNaN(id)) {
    return res.status(400).json({ message: 'El ID debe ser un número válido' });
  }

  // Validar que al menos uno de los campos haya sido proporcionado
  if (!usuario && !clave && vigente === undefined) {
    return res.status(400).json({ message: 'Debes proporcionar al menos un campo para actualizar' });
  }

  // Consulta SQL para actualizar los datos del usuario
  const sql = 'UPDATE usuarios SET usuario = ?, clave = ?, vigente = ? WHERE idUsuario = ?';

  // Ejecutar la consulta SQL
  db.query(sql, [usuario, clave, vigente, id], (err, results) => {
    if (err) {
      return res.status(500).send('Error updating user');
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario actualizado exitosamente' });
  });
};

module.exports = ventasCtrl;