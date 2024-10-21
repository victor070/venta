const express = require('express');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT)

//middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/usarios', require('./routes/usuarios'))
app.get('/api',(req,res)=> res.send('usuarios'))
module.exports = app;
