const cron = require('node-cron');
const axios = require('axios');

const start = () => {
  const cronExpr = process.env.REMINDER_CRON || '*/60 * * * * *';
  console.log('Starting agent reminder worker with cron:', cronExpr);
  cron.schedule(cronExpr, async () => {
    try {
      const url = `${process.env.BASE_URL || 'http://localhost:4000'}/api/agent/run`;
      const res = await axios.post(url, { userId: 'default-user' });
      const data = res.data;
      console.log('[AgentWorker] proposal:', data.result.proposal.message);
      // In production: send push / email / in-app notification for the proposal
    } catch (err) {
      console.error('Worker error', err.message);
    }
  });
};

module.exports = { start };
