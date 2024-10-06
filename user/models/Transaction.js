// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    stockSymbol: { type: String, required: true },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);
