const ChatbotData = require("../models/chatbot");

exports.create = async (req, res) => {
  try {
    const data = await ChatbotData.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: "Lỗi tạo dữ liệu chatbot" });
  }
};
exports.ask =  async (req, res) => {
  const { question } = req.body;
  const data = await ChatbotData.findOne({ question });
  if (data) {
    res.json({ answer: data.answer });
  } else {
    res.json({ answer: "Xin lỗi, tôi chưa hiểu câu hỏi này." });
  }
}
exports.getAll = async (req, res) => {
  try {
    const data = await ChatbotData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy dữ liệu chatbot" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const data = await ChatbotData.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy dữ liệu chatbot" });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await ChatbotData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Lỗi cập nhật dữ liệu chatbot" });
  }
};

exports.remove = async (req, res) => {
  try {
    await ChatbotData.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa dữ liệu chatbot thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi xóa dữ liệu chatbot" });
  }
};