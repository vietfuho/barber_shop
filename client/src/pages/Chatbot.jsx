import React, { useState, useEffect } from "react";
import { RiChatVoiceAiFill } from "react-icons/ri";
import axios from "axios";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("adminId"); // nếu null → dùng AI

  /* ======================
     LOAD MESSAGE KHI MỞ
  ====================== */
  useEffect(() => {
    if (open) {
      setMessages([
        { sender: "bot", content: "👋 Xin chào! Tôi có thể giúp gì cho bạn?" }
      ]);
    }
  }, [open]);

  /* ======================
     SEND MESSAGE
  ====================== */
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    /* ======================
       CASE 1: CÓ ADMIN
    ====================== */
    if (adminId) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/member/messages/sendtoadmin",
          { receiverId: adminId, content: input },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMessages((prev) => [...prev, res.data]);
      } catch (err) {
        console.error("Lỗi gửi admin:", err);
      }
      return;
    }

    /* ======================
       CASE 2: KHÔNG CÓ ADMIN → AI
    ====================== */
    try {
      // call local FAQ-based AI endpoint
      const res = await axios.post("http://localhost:5000/api/ai/faq", {
        question: input
      });

      const aiAnswer =
        Array.isArray(res.data) && res.data.length > 0
          ? res.data[0].answer
          : "Xin lỗi, tôi chưa hiểu câu hỏi.";

      setMessages((prev) => [...prev, { sender: "bot", content: aiAnswer }]);
    } catch (err) {
      console.error("Lỗi AI:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: "⚠️ AI đang bận, vui lòng thử lại sau." }
      ]);
    }
  };

  return (
    <div className="fixed bottom-7 right-7 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <RiChatVoiceAiFill size={28} />
      </button>

      {open && (
        <div className="mt-2 w-80 h-96 bg-white shadow-xl rounded-lg flex flex-col">
          <div className="bg-blue-600 text-white p-2 rounded-t-lg flex justify-between items-center">
            <span>🤖 Trợ lý AI</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className="p-2 border-t flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border rounded px-2 py-1 text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-600 text-white px-3 py-1 rounded"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
