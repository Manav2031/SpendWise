// Simple heuristic analysis used by the agent
function sumByCategory(transactions) {
  return transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
}

function monthlyEstimate(transactions) {
  const now = Date.now();
  const cutoff = now - (30 * 24 * 60 * 60 * 1000);
  const last30 = transactions.filter(t => new Date(t.date).getTime() >= cutoff);
  const total = last30.reduce((s, t) => s + t.amount, 0);
  return { totalLast30Days: total, avgDaily: total / 30, count: last30.length };
}

function generateSavingsRecommendations(transactions = []) {
  const totals = sumByCategory(transactions);
  const { totalLast30Days, avgDaily } = monthlyEstimate(transactions);

  const categories = Object.entries(totals).sort((a,b) => b[1] - a[1]);
  const topLeak = categories.length ? { category: categories[0][0], amount: categories[0][1] } : null;

  const recommendedMonthlySave = Math.max(100, Math.round(totalLast30Days * 0.10));

  const quickWins = [];
  if (totals['food'] && totals['food'] > (totalLast30Days * 0.15)) {
    quickWins.push('Reduce food delivery by 20% using weekly meal prep.');
  }
  if (totals['coffee'] && totals['coffee'] > 500) {
    quickWins.push('Consider making coffee at home to save ~₹500/month.');
  }

  return {
    totalLast30Days,
    avgDaily,
    topLeak,
    recommendedMonthlySave,
    quickWins
  };
}

module.exports = { generateSavingsRecommendations };
