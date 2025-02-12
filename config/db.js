require('dotenv').config();  // Cargar las variables de entorno desde .env
const mysql = require('mysql2');

// Detectar si estamos en producción o desarrollo
const isProduction = process.env.NODE_ENV === 'production';

// Seleccionar las configuraciones de la base de datos
const pool = mysql.createPool({
  host: isProduction ? process.env.DB_HOST : 'localhost',   // Si estamos en producción, usa la configuración de Railway
  user: isProduction ? process.env.DB_USER : 'root',        // Si estamos en producción, usa el usuario de Railway
  password: isProduction ? process.env.DB_PASSWORD : '2751356junior', // Contraseña para producción
  database: isProduction ? process.env.DB_NAME : 'recuerdos_db', // Base de datos de producción
  port: isProduction ? process.env.DB_PORT : 3306,          // Puerto de producción o local
});

// Usamos pool.promise() para habilitar el uso de promesas
const db = pool.promise();

// Verificar la conexión
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
    connection.release();  // Liberamos la conexión después de usarla
  }
});

module.exports = db;
