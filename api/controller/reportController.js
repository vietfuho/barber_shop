const Report = require("../models/report");

exports.create = async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: "Lỗi tạo báo cáo" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy báo cáo" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy báo cáo" });
  }
};

exports.update = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: "Lỗi cập nhật báo cáo" });
  }
};

exports.remove = async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa báo cáo thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi xóa báo cáo" });
  }
};