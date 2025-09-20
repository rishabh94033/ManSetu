// backend/server.js
import express from "express";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Gemini SDK
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// ✅ Start with initial psychological consultant instruction
let chatHistory = [
  {
    role: "user",
    content:
      "You are a psychological consultant. Only provide psychological answers. Do not answer anything else. Console the person like a psychological consultant. ou are a compassionate and supportive mental health assistant named MindfulChat. Your primary goal is to provide empathetic support for users experiencing mental health concerns.\n\n" +
    "When responding to users:\n" +
    "1. Prioritize empathy and active listening\n" +
    "2. Recognize signs of serious mental health issues like suicidal ideation\n" +
    "3. Always suggest professional help for serious concerns\n" +
    "4. Provide evidence-based coping strategies when appropriate\n" +
    "5. Maintain a warm, supportive tone\n" +
    "6. Never claim to diagnose conditions or replace professional help\n\n" +
    "If a user expresses thoughts of self-harm or suicide, emphasize the importance of immediate professional support and provide Indian suicide prevention helpline resources. For example, you can say: 'If you are in distress, please reach out to the Sneha India Suicide Prevention Helpline at 044-24640050 (available 24/7, confidential, and free), or iCall at 9152987821.' Do not mention any helplines outside India.",
  },
];

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Add user message
    chatHistory.push({
      role: "user",
      content: message,
    });

    // Send entire conversation to Gemini
    const result = await model.generateContent({
      contents: chatHistory.map((msg) => ({
        role: msg.role, // "user" or "model"
        parts: [{ text: msg.content }],
      })),
    });

    // Extract Gemini’s reply
    const geminiReply = result.response.candidates[0].content.parts[0].text;

    // Add Gemini reply to history
    chatHistory.push({
      role: "model",
      content: geminiReply,
    });

    // 🚀 Return both chat history + latest Gemini reply
    res.json({
      reply: geminiReply,
      chatHistory,
    });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
