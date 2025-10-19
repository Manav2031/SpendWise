const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: String, default: 'default-user' },
  amount: { type: Number, required: true },
  category: { type: String, default: 'uncategorized' },
  note: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
