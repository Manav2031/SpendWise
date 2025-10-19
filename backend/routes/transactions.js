const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const analysisService = require('../services/analysis');

// Create a transaction (record daily expenditure)
router.post('/', async (req, res) => {
  try {
    const { amount, category, note, userId } = req.body;
    const tx = new Transaction({ amount, category, note, userId });
    await tx.save();
    return res.status(201).json(tx);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to save transaction' });
  }
});

// Get transactions for a user (with optional date range)
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    const txs = await Transaction.find({ userId }).sort({ date: -1 }).limit(500);
    return res.json(txs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Analysis endpoint - returns simple recommendations
router.get('/analysis', async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    const txs = await Transaction.find({ userId }).sort({ date: -1 });
    const analysis = analysisService.generateSavingsRecommendations(txs);
    return res.json(analysis);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Analysis failed' });
  }
});

module.exports = router;
