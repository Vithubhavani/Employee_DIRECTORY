require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Test the backend
app.get("/", (req, res) => {
  res.send("Employee API is running");
});

// Get employees
app.get("/api/employees", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM employees");
    res.json(rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Add employee
app.post("/api/employees", async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim() ||
      typeof role !== "string" || !role.trim()
    ) {
      return res.status(400).json({
        error: "Name, email and role are required",
      });
    }

    const [result] = await db.execute(
      "INSERT INTO employees (name, email, role) VALUES (?, ?, ?)",
      [name.trim(), email.trim(), role.trim()]
    );

    res.status(201).json({
      id: result.insertId,
      name: name.trim(),
      email: email.trim(),
      role: role.trim(),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to add employee" });
  }
});

app.listen(PORT, (error) => {
  if (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
  console.log(`Backend running on http://localhost:${PORT}`);
});
