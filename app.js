require("dotenv").config();
const express = require("express");
const app = express();

//security middleware
app.use((req, res, next) => {
  const apiKey = req.headers["unknown api key"];
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(403).json({ error: "Forbidden: Invalid API Key" });
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
