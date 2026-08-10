// db.js
// Sets up a reusable MySQL connection pool using mysql2/promise.
// A pool (rather than a single connection) is used so multiple requests
// can query the database concurrently without waiting on each other.

require('dotenv').config();
const mysql = require('mysql2/promise');

const useSSL = process.env.DB_SSL === 'true';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Some hosted MySQL providers require SSL. If DB_SSL=true in .env,
  // this enables it with a relaxed cert check that works for most
  // managed providers. Tighten this (e.g. provide a CA cert) if your
  // provider requires stricter verification.
  ssl: useSSL ? { rejectUnauthorized: true } : undefined
});

/**
 * Creates the `bookings` table if it doesn't already exist.
 * Safe to call every time the server starts.
 */
async function ensureSchema() {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      company VARCHAR(255),
      notes TEXT,
      demo_date DATE NOT NULL,
      demo_time VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  await pool.query(createTableSql);
}

module.exports = { pool, ensureSchema };
