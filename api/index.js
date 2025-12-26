const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/ConnectDB.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 5000;

/* =======================
   KẾT NỐI DATABASE
======================= */
connectDB(process.env.MONGODB_URL);

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

/* =======================
   KHỞI TẠO GEMINI AI
   ⚠️ model PHẢI có "models/"
======================= */
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({
  model: "models/gemini-1.5-flash"
});

/* =======================
   API AI SEARCH
======================= */
app.post("/api/ai/search", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "question is required" });
    }

    const prompt = `
Bạn là một trợ lý thông minh giúp tư vấn khách hàng cho website.

Câu hỏi của khách hàng:
"${question}"

Hãy trả lời dưới dạng JSON ARRAY, mỗi phần tử là object:
[
  { "answer": "..." }
]

CHỈ trả về JSON, KHÔNG markdown, KHÔNG giải thích.
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text().trim();

    // loại bỏ ```json nếu Gemini tự thêm
    text = text.replace(/```json|```/g, "");

    const data = JSON.parse(text);

    return res.status(200).json(data);

  } catch (error) {
    console.error("❌ AI ERROR:", error.message);
    return res.status(500).json({
      error: "AI processing failed",
      detail: error.message
    });
  }
});

/* =======================
   ROUTES KHÁC (NẾU CÓ)
======================= */
const route = require("./routes/index_routes.js");
route(app);

/* =======================
   START SERVER
======================= */
app.listen(port, () => {
  console.log(`✅ Server listening on http://localhost:${port}`);
});

module.exports = app;
