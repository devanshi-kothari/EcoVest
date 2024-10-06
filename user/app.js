// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');
const cors = require('cors');

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend's domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Failed to connect to MongoDB', err));
API = "/api";
// Routes

// 1. Create a new transaction
app.post(API + '/transactions', async (req, res) => {
    try {
        const { userId, stockSymbol, transactionType, quantity, price } = req.body;
        console.log(req.body);
        const transaction = new Transaction({ userId, stockSymbol, transactionType, quantity, price });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 2. Get all transactions for a user
app.get(API + '/transactions/:userId', async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.params.userId });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// // 3. Update a transaction
// app.put(API'/transactions/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
//         if (!updatedTransaction) {
//             return res.status(404).json({ error: 'Transaction not found' });
//         }
//         res.json(updatedTransaction);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // 4. Delete a transaction
// app.delete('/transactions/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedTransaction = await Transaction.findByIdAndDelete(id);
//         if (!deletedTransaction) {
//             return res.status(404).json({ error: 'Transaction not found' });
//         }
//         res.json({ message: 'Transaction deleted' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Endpoint to serve the configuration file
app.get("/auth_config.json", (req, res) => {
    res.sendFile(join(__dirname, "auth_config.json"));
});

// Serve the index page for all other requests
app.get("/*", (_, res) => {
    res.sendFile(join(__dirname, "/frontend/my_app/index.html"));
});

/*
// Listen on port 3000
app.listen(3000, () => console.log("Application running on port 3000"));


const { createAuth0Client } = require('@auth0/auth0-spa-js');

let auth0Client = null;

const configureClient = async () => {
    auth0Client = await createAuth0Client({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID
    });
};

const updateUI = async () => {
    const isAuthenticated = await auth0Client.isAuthenticated();
    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;
};

const login = async () => {
    await auth0Client.loginWithRedirect({
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    });
};

const logout = () => {
    auth0Client.logout({
        returnTo: window.location.origin
    });
};

window.onload = async () => {
    await configureClient();
    updateUI();

    // Handle the case where the user is redirected back to your app after login
    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
        // Process the login result
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/");
    }
};

 */