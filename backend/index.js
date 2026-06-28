import express from "express";
import cors from "cors";
import agentRoutes from "./src/routes/agent.js";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-cron-secret"],
  })
);

app.use(express.json());

app.use("/api/agent", agentRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "TraceFlow Backend running ✅",
    supabase: process.env.SUPABASE_URL ? "✅ loaded" : "❌ missing",
    gemini: process.env.GEMINI_API_KEY ? "✅ loaded" : "❌ missing",
    cron: process.env.CRON_SECRET ? "✅ loaded" : "❌ missing",
  });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});