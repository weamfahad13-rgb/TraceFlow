import express from "express";
import {
  runAgentResearch,
  getUserLibrary,
  runDailyAgent,
  markReportAsRead,
} from "../services/agentService.js";

const router = express.Router();

router.post("/research", async (req, res) => {
  try {
    const { userId, topic, language } = req.body;

    if (!userId || !topic) {
      return res.status(400).json({
        error: "userId and topic are required",
      });
    }

    const result = await runAgentResearch(userId, topic, language || "en");

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("Agent error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/library/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await getUserLibrary(userId);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.post("/read/:reportId", async (req, res) => {
  try {
    const { reportId } = req.params;

    const report = await markReportAsRead(reportId);

    res.json({
      success: true,
      data: report,
    });
  } catch (err) {
    console.error("Mark report as read error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

router.post("/daily", async (req, res) => {
  try {
    const secret = req.headers["x-cron-secret"];

    if (secret !== process.env.CRON_SECRET) {
      return res.status(401).json({
        error: "Unauthorized cron request",
      });
    }

    const result = await runDailyAgent();

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("Daily agent error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;