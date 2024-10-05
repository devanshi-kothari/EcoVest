// Import the express module
const express = require('express');

// Create an instance of Express
const app = express();
app.use(express.json());

// Define a port number
const PORT = 5109;

// Create a simple API endpoint
app.get('/api/user', (req, res) => {
  res.json({
    message: 'Hello, user!!!'
  });
});



const axios = require('axios');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const {
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_ENV
} = process.env;

// Plaid client configuration
const configuration = new Configuration({
  basePath: PlaidEnvironments.development, // or production
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Content-Type': 'application/json',
      'Plaid-Version': '2020-09-14'
    },
  },
});

const plaidClient = new PlaidApi(configuration);

// Endpoint to create a link token
app.post('/create_link_token', async (req, res) => {
  const request = {
    user: {
      client_user_id: req.body.id, // Replace with a unique user ID from your system
      email_address: req.body.address // Replace with the user's email
    },
    products: ['investments_auth'], // Specify the products you want to use
    client_name: 'Gopher Brokerage',
    language: 'en',
    country_codes: ['US'],
  };

  try {
    const response = await plaidClient.linkTokenCreate(request);
    const linkToken = response.data.link_token;
    res.json({ link_token: linkToken });
  } catch (error) {
    console.error('Error creating link token:', error);
    res.status(500).json({ error: 'Error creating link token' });
  }
});

// // Endpoint to exchange the public token for an access token
// app.post('/exchange_public_token', async (req, res) => {
//   const { public_token } = req.body;

//   try {
//     const response = await axios.post(`${PLAID_ENV}/item/public_token/exchange`, {
//       client_id: PLAID_CLIENT_ID,
//       secret: PLAID_SECRET,
//       public_token: public_token,
//     });

//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Start the server and listen on the defined port
app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });