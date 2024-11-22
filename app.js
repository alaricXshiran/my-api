require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

// Enable CORS for all origins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "api-key"], // Allow these headers
  })
);

// Security middleware for rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter); // Apply rate limiting middleware

// API Key Authentication Middleware
app.use((req, res, next) => {
  const apiKey = req.headers["api-key"];
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(403).json({ error: "Invalid API Key" });
  }
});

// API endpoint
app.get("/greet", (req, res) => {
  const name = req.query.name || "World";
  res.json({ message: `Hello, ${name}!` });
});

// Set the port from environment variable or default to 3000 for local testing
const port = process.env.PORT || 3000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
