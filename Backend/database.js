
require("dotenv").config();

const mysql = require("mysql2/promise");

async function createDatabase() {
  // Connect to MySQL without selecting a database
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    // Create the database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
    );

    console.log("Database created successfully!");

    // Select our database
    await connection.changeUser({
      database: process.env.DB_NAME,
    });

    // Create the employee table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        role VARCHAR(100) NOT NULL
      )
    `);

    console.log("Employees table created successfully!");
  } finally {
    await connection.end();
  }
}

createDatabase().catch((error) => {
  console.error("Database setup failed:", error.message);
  process.exitCode = 1;
});
