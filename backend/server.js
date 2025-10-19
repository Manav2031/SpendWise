require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const transactionsRouter = require("./routes/transactions");
const agent = require("./services/agent");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/transactions", transactionsRouter);

// Simple agent-first endpoint to invoke agent actions manually
app.post("/api/agent/run", async (req, res) => {
  try {
    const result = await agent.runAgentForUser(
      req.body.userId || "default-user"
    );
    return res.json({ status: "ok", result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Agent run failed" });
  }
});

app.get("/", (req, res) => res.send({ status: "SpendWise backend running" }));

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
      // start agent scheduler after DB connection
      const worker = require("./worker/reminderWorker");
      worker.start();
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });
