const WorkSchedule = require("../models/WorkSchedule");
const User = require("../models/user");

// Admin tạo lịch cho staff bằng username
exports.createWorkSchedule = async (req, res) => {
  try {
    const { username, date, shift, note } = req.body;

    // Tìm nhân viên theo username
    const staff = await User.findOne({ username, role: "staff" });
    if (!staff) {
      return res.status(400).json({ message: "Không tìm thấy nhân viên hợp lệ" });
    }

    // Check ngày không được là quá khứ
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const scheduleDate = new Date(date);
    if (scheduleDate < today) {
      return res.status(400).json({ message: "Không thể tạo lịch cho ngày đã qua" });
    }

    // Check trùng ca trong cùng ngày
    const existing = await WorkSchedule.findOne({
      staffId: staff._id,
      date: scheduleDate,
      shift
    });
    if (existing) {
      return res.status(400).json({ message: "Nhân viên này đã có lịch trong ca đó" });
    }

    // Tạo mới
    const newSchedule = new WorkSchedule({
      staffId: staff._id,
      date: scheduleDate,
      shift,
      note,
      createdBy: req.user.id
    });

    await newSchedule.save();
    res.status(201).json({ message: "Tạo lịch thành công", schedule: newSchedule });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Admin xem tất cả lịch
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await WorkSchedule.find()
      .populate("staffId", "username")
      .populate("createdBy", "username");
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Staff xem lịch của mình
exports.getMySchedule = async (req, res) => {
  try {
    const schedules = await WorkSchedule.find({ staffId: req.user.id })
      .populate("staffId", "username");
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};