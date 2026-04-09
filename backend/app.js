const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const redis = require("redis");

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// PostgreSQL
// =======================
const pool = new Pool({
  user: "user",
  host: "database",
  database: "db",
  password: "pass",
  port: 5432,
});

// =======================
// Redis
// =======================
const redisClient = redis.createClient({
  url: "redis://redis:6379"
});

redisClient.connect()
  .then(() => console.log("Redis connected ✔"))
  .catch(err => console.log("Redis error:", err));

// =======================
// Health check
// =======================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// =======================
// GET USERS (with cache)
// =======================
app.get("/users", async (req, res) => {
  try {
    // 1. check cache
    const cachedUsers = await redisClient.get("users");

    if (cachedUsers) {
      console.log("📦 Cache HIT");
      return res.json(JSON.parse(cachedUsers));
    }

    console.log("🗄️ Cache MISS");

    // 2. get from DB
    const result = await pool.query("SELECT * FROM users");

    // 3. save in cache
    await redisClient.setEx(
      "users",
      60, // TTL
      JSON.stringify(result.rows)
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

// =======================
// ADD USER
// =======================
app.post("/users", async (req, res) => {
  const { name } = req.body;

  try {
    await pool.query("INSERT INTO users (name) VALUES ($1)", [name]);

    // invalidate cache
    await redisClient.del("users");

    res.json({ message: "User created ✔" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});

// =======================
// DELETE USER
// =======================
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);

    // invalidate cache ❗ IMPORTANT
    await redisClient.del("users");

    res.json({ message: "User deleted ✔" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

// =======================
// START SERVER
// =======================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});