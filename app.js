require("dotenv").config();
const express = require("express");
const app = express();

//security middleware
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter); // Apply rate limiting middleware
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
  res.json({ message: `Hello, ${name}! ` });
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
