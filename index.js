require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const app = express();

app.use(express.static('public'));
// Configura la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: true
});

// Endpoint para obtener la tabla "gramineas"
app.get('/gramineas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gramineas');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener la tabla gramineas:', error);
    res.status(500).json({ error: 'Error al obtener la tabla gramineas' });
  }
});

// Inicia el servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
