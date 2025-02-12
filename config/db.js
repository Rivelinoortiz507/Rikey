require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectTimeout: 10000,  // Ajusta el tiempo de espera si es necesario
});

// Verificar la conexión
pool.getConnection()
  .then(connection => {
    console.log('✅ Conectado a la base de datos MySQL en Railway');
    connection.release(); // Liberar conexión del pool
  })
  .catch(error => {
    console.error('❌ Error al conectar a MySQL:', error.message);
  });

module.exports = pool;
