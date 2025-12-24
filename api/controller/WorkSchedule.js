const WorkSchedule = require("../models/WorkSchedule");
const User = require("../models/user");

// Admin tạo lịch làm việc cho staff
exports.createWorkSchedule = async (req, res) => {
  try {
    const { staffId, date, shift, note } = req.body;

    // Kiểm tra staff có tồn tại không
    const staff = await User.findById(staffId);
    if (!staff || staff.role !== "staff") {
      return res.status(400).json({ message: "Không tìm thấy nhân viên hợp lệ" });
    }

    // ❌ Check ngày không được là quá khứ
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset về 00:00
    const scheduleDate = new Date(date);
    if (scheduleDate < today) {
      return res.status(400).json({ message: "Không thể tạo lịch cho ngày đã qua" });
    }

    // ❌ Check trùng ca trong cùng ngày
    const existing = await WorkSchedule.findOne({
      staffId,
      date: scheduleDate,
      shift
    });
    if (existing) {
      return res.status(400).json({ message: "Nhân viên này đã có lịch trong ca đó" });
    }

    const newSchedule = new WorkSchedule({
      staffId,
      date: scheduleDate,
      shift,
      note,
      createdBy: req.user.id
    });

    await newSchedule.save();

    res.status(201).json({ message: "Tạo lịch làm việc thành công", schedule: newSchedule });
  } catch (error) {
    res.status(500).json({ error: error.message || "Lỗi máy chủ" });
  }
};
// Admin xem lịch làm việc của tất cả staff
// Admin xem tất cả lịch
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await WorkSchedule.find()
      .populate("staffId", "username email"); // lấy tên và email nhân viên
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Staff xem lịch của mình
exports.getMySchedule = async (req, res) => {
  try {
    const schedules = await WorkSchedule.find({ staffId: req.user.id })
      .populate("staffId", "username email"); // lấy tên và email nhân viên
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};