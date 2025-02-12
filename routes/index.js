const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Asumiendo que tu archivo de conexión es db.js

router.get('/', async (req, res) => {
  try {
    console.log("Consultando la base de datos...");
    const [photos] = await db.query('SELECT * FROM photos ORDER BY created_at DESC'); // Utiliza `query` en lugar de `db.query()`
    res.render('index', { photos });  // Renderiza la vista con las fotos
  } catch (error) {
    console.error('Error al obtener las fotos:', error);
    res.status(500).send('Error al obtener las fotos');
  }
});

module.exports = router;
