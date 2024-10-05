// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    stockSymbol: { type: String, required: true },
    transactionType: { type: String, required: true, enum: ['buy', 'sell'] },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
