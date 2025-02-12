const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../config/db');

// Ruta de registro
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Comprobación básica de los campos
    if (!username || !email || !password) {
      return res.status(400).send('Todos los campos son obligatorios');
    }

    // Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertamos el usuario en la base de datos
    await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    res.redirect('/auth/login'); // Redirigimos a la página de login después de registrar
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar usuario');
  }
});

// Ruta de login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (user.length > 0 && await bcrypt.compare(password, user[0].password)) {
      req.session.userId = user[0].id;
      req.session.username = user[0].username;
      res.redirect('/'); // Redirigimos a la página principal después de iniciar sesión
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al iniciar sesión');
  }
});

// Ruta de logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/'); // Redirigimos a la página principal después de hacer logout
  });
});

module.exports = router;
