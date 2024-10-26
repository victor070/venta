const express = require('express');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT)

//middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/ventas', require('./routes/ventas'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/clientes', require('./routes/clientes'));
app.get('/api',(req,res)=> res.send('usuarios'));
module.exports = app;
