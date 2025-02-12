const express = require('express');
const router = express.Router();
const upload = require('../config/upload');  // Aquí configuras Multer
const db = require('../config/db');  // Importa la conexión de la base de datos

// Ruta para mostrar el formulario de subida
router.get('/', (req, res) => {
  res.render('upload', { title: 'Subir Nuevo Recuerdo' });
});

// Ruta para procesar la subida de archivos
router.post('/', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subió ninguna foto.');
  }

  const { description } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;

  // Guardar la foto y descripción en la base de datos usando el pool de conexiones
  try {
    const [result] = await db.query('INSERT INTO photos (imageUrl, description) VALUES (?, ?)', [imageUrl, description]);
    console.log('Foto guardada con éxito, ID:', result.insertId);
    res.redirect('/');
  } catch (error) {
    console.error('Error al guardar la foto en la base de datos:', error);
    res.status(500).send('Error al guardar la foto en la base de datos.');
  }
});

module.exports = router;
