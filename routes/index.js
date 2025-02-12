const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Conexión a MySQL

// Página principal - Mostrar lista de fotos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM photos ORDER BY created_at DESC');
    res.render('index', { title: 'Lugar de Recuerdos', photos: rows });
  } catch (error) {
    console.error('Error al obtener las fotos:', error);
    res.status(500).send('Error al obtener las fotos.');
  }
});

module.exports = router;
