// Import the express module
const express = require('express');

// Create an instance of Express
const app = express();

// Define a port number
const PORT = 5109;

// Create a simple API endpoint
app.get('/api/user', (req, res) => {
  res.json({
    message: 'Hello, user!!!'
  });
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


const axios = require('axios');

// Your Plaid credentials
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV;

app.use(express.json());

// Endpoint to create a link token
app.post('/create_link_token', async (req, res) => {
  try {
    const response = await axios.post(`${PLAID_ENV}/link/token/create`, {
      client_id: PLAID_CLIENT_ID,
      secret: PLAID_SECRET,
      user: {
        client_user_id: req.session.user_id[0].user_id, // Your user's ID in your app
      },
      client_name: req.session.user_name[0].user_name,
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to exchange the public token for an access token
app.post('/exchange_public_token', async (req, res) => {
  const { public_token } = req.body;

  try {
    const response = await axios.post(`${PLAID_ENV}/item/public_token/exchange`, {
      client_id: PLAID_CLIENT_ID,
      secret: PLAID_SECRET,
      public_token: public_token,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5190, () => {
  console.log('Server running on port 5190');
});