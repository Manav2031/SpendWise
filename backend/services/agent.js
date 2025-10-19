/*
  Agent-first service (simulated):
  - Runs analysis, creates a plan and can simulate proposing an automatic micro-save.
  - In a real product this would require user consent and secure bank integrations.
*/
const Transaction = require('../models/Transaction');
const analysis = require('./analysis');

async function runAgentForUser(userId = 'default-user'){
  // fetch transactions
  const txs = await Transaction.find({ userId }).sort({ date: -1 });
  const report = analysis.generateSavingsRecommendations(txs);

  // agent "thoughts" (explainable): choose an action
  const actions = [];
  if (report.recommendedMonthlySave > 0) {
    actions.push({ type: 'suggest_save', amount: report.recommendedMonthlySave, reason: '10% rule based on last 30 days' });
  }
  if (report.topLeak && report.topLeak.category === 'food') {
    actions.push({ type: 'nudge_reduce_category', category: 'food', suggestion: 'Limit delivery to twice a week' });
  }

  // Simulate an autonomous micro-save proposal (does not transfer money)
  const proposedAutoSave = Math.round(report.recommendedMonthlySave / 4); // weekly micro-save
  const proposal = {
    proposedAutoSave,
    message: `I propose an automatic micro-save of ₹${proposedAutoSave} per week to build your investment buffer.`
  };

  return { report, actions, proposal };
}

module.exports = { runAgentForUser };
