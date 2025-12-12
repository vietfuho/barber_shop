import React, { useState, useEffect } from "react";
import { RiChatVoiceAiFill } from "react-icons/ri";
import axios from "axios";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" }
  ]);
  const [input, setInput] = useState(""); // lưu câu hỏi nhập tay

  // Lấy dữ liệu chatbot từ API (các câu hỏi gợi ý)
  useEffect(() => {
    if (open) {
      axios.get("http://localhost:5000/api/chatbot")
        .then(res => setOptions(res.data))
        .catch(err => console.error("Lỗi lấy dữ liệu chatbot:", err));
    }
  }, [open]);

  // Khi người dùng chọn một câu hỏi gợi ý
  const handleSelect = (item) => {
    const newMessages = [
      ...messages,
      { sender: "user", text: item.question },
      { sender: "bot", text: item.answer }
    ];
    setMessages(newMessages);
  };

  // Khi người dùng nhập tay và gửi
  const handleSend = async () => {
    if (!input.trim()) return;

    // Thêm tin nhắn user
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      // Gọi API backend để lấy câu trả lời
      const res = await axios.post("http://localhost:5000/api/chatbot/ask", {
        question: input
      });
      const answer = res.data.answer || "Xin lỗi, tôi chưa có câu trả lời.";

      setMessages([...newMessages, { sender: "bot", text: answer }]);
    } catch (err) {
      console.error("Lỗi gửi câu hỏi:", err);
      setMessages([...newMessages, { sender: "bot", text: "Có lỗi xảy ra khi xử lý câu hỏi." }]);
    }

    setInput(""); // reset input
  };

  return (
    <div className="fixed bottom-7 right-7 z-50">
      {/* Icon Chatbot */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <RiChatVoiceAiFill size={28} />
      </button>

      {/* Cửa sổ chat */}
      {open && (
        <div className="mt-2 w-80 h-96 bg-white shadow-xl rounded-lg flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-2 rounded-t-lg flex justify-between items-center">
            <span>Chatbot</span>
            <button onClick={() => setOpen(false)} className="text-sm">✕</button>
          </div>

          {/* Nội dung chat */}
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Hiển thị các lựa chọn từ API */}
            {options.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Bạn có thể chọn nhanh:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {options.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => handleSelect(item)}
                      className="bg-gray-100 border px-2 py-1 rounded text-sm hover:bg-blue-100"
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input nhập tay */}
          <div className="p-2 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi..."
              className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
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