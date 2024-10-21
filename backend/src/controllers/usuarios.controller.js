const db = require('../database');

const usuariosCtrl = {};

// Método para obtener todos los usuarios
usuariosCtrl.getUsuarios = async (req, res) => {
    try {
      const sql = 'SELECT * FROM usuarios';
      const results = await db.queryAsync(sql);
      res.json(results);
    } catch (err) {
      res.status(500).send('Error retrieving users');
    }
  };

// Método para insertar un nuevo usuario
usuariosCtrl.postUsuarios = async (req, res) => {
    const { usuario, clave } = req.body;
  
    if (!usuario || !clave) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
  
    try {
      const sql = 'INSERT INTO usuarios (usuario, clave) VALUES (?, ?)';
      const results = await db.queryAsync(sql, [usuario, clave]);
      res.status(201).json({ message: 'Usuario creado exitosamente', id: results.insertId });
    } catch (err) {
      res.status(500).send('Error adding user');
    }
  };
  
  // Método para obtener un usuario por su id
  usuariosCtrl.getUsuariosById = async (req, res) => {
    const { id } = req.params;
  
    if (isNaN(id)) {
      return res.status(400).json({ message: 'El ID debe ser un número válido' });
    }
  
    try {
      const sql = 'SELECT * FROM usuarios WHERE idUsuario = ?';
      const results = await db.queryAsync(sql, [id]);
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      res.json(results[0]);
    } catch (err) {
      res.status(500).send('Error retrieving user');
    }
  };
  
  // Método para actualizar un usuario por su idUsuario
  usuariosCtrl.putUsuariosById = async (req, res) => {
    const { id } = req.params;
    const { usuario, clave, vigente } = req.body;
  
    if (isNaN(id)) {
      return res.status(400).json({ message: 'El ID debe ser un número válido' });
    }
  
    if (!usuario && !clave && vigente === undefined) {
      return res.status(400).json({ message: 'Debes proporcionar al menos un campo para actualizar' });
    }
  
    try {
      const sql = 'UPDATE usuarios SET usuario = ?, clave = ?, vigente = ? WHERE idUsuario = ?';
      const results = await db.queryAsync(sql, [usuario, clave, vigente, id]);
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (err) {
      res.status(500).send('Error updating user');
    }
  };


module.exports = usuariosCtrl;