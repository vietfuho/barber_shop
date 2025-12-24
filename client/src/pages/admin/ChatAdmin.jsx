import React, { useState, useEffect } from "react";
import { RiChatVoiceAiFill } from "react-icons/ri";
import axios from "axios";

function ChatAdmin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const memberId = localStorage.getItem("memberId"); // id của member cần chat

  // Khi mở popup thì load tin nhắn từ API dành cho admin
  useEffect(() => {
    if (open) {
      axios.get("http://localhost:5000/api/admin/messages/getforadmin", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setMessages(res.data))
        .catch(err => console.error("Lỗi lấy tin nhắn:", err));
    }
  }, [open, token]);

  // Admin gửi tin nhắn tới member
  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { senderId: userId, content: input }];
    setMessages(newMessages);

    try {
      const res = await axios.post("http://localhost:5000/api/admin/messages/sendtomember",
        { receiverId: memberId, content: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...newMessages, res.data]);
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
    }

    setInput("");
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
            <span>Chat với Member</span>
            <button onClick={() => setOpen(false)} className="text-sm">✕</button>
          </div>

          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[70%] ${
                  msg.senderId === userId
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
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
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

export default ChatAdmin;