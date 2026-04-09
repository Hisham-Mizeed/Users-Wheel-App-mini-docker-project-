const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const redis = require("redis");

const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL
const pool = new Pool({
  user: "user",
  host: "database",
  database: "db",
  password: "pass",
  port: 5432,
});

// Redis
const redisClient = redis.createClient({
  url: "redis://redis:6379",
});

redisClient.connect().catch(console.error);

// Routes
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// GET users (with caching)
app.get("/users", async (req, res) => {
  try {
    const cached = await redisClient.get("users");

    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const result = await pool.query("SELECT * FROM users");

    await redisClient.set("users", JSON.stringify(result.rows));

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

// ADD user
app.post("/users", async (req, res) => {
  const { name } = req.body;

  try {
    await pool.query("INSERT INTO users (name) VALUES ($1)", [name]);

    await redisClient.del("users");

    res.json({ message: "User added" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

// DELETE user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);

    await redisClient.del("users");

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});