// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');

const app = express();
app.use(express.json());

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
