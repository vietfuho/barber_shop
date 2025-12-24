const Message = require("../models/chatbot");

// Member gửi tin nhắn cho admin/staff
exports.sendMessageToAdmin = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const msg = await Message.create({
      senderId: req.user.id,
      receiverId,
      content
    });
    // thêm lời chào mặc định cho member
    res.json({
      ...msg.toObject(),
      botReply: "Xin chào! Tôi có thể giúp gì cho bạn?"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Member lấy tin nhắn (bao gồm cả phản hồi từ admin/staff)
exports.getMessagesForMember = async (req, res) => {
  try {
    const msgs = await Message.find({
      $or: [{ senderId: req.user.id }, { receiverId: req.user.id }]
    })
      .populate("senderId", "username role")
      .populate("receiverId", "username role")
      .sort({ createdAt: 1 });

    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};