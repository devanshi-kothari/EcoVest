// Import the express module
const express = require('express');

// Create an instance of Express
const app = express();

// Define a port number
const PORT = 5109;

// Create a simple API endpoint
app.get('/api/user', (req, res) => {
  res.json({
    message: 'Hello, user!'
  });
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
