const Booking = require("../models/booking");

// =======================
// Tạo lịch hẹn
// =======================
exports.create = async (req, res) => {
  try {
    const { fullName, phone, email, date, note } = req.body;

    if (!fullName || !phone || !date) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
    }

    const booking = await Booking.create({
      fullName,
      phone,
      email,
      date,
      note,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: "Lỗi tạo lịch hẹn", details: err.message });
  }
};

// =======================
// Lấy tất cả lịch hẹn
// =======================
exports.getAll = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy danh sách lịch hẹn" });
  }
};

// =======================
// Lấy 1 lịch hẹn
// =======================
exports.getOne = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ error: "Không tìm thấy lịch hẹn" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy lịch hẹn" });
  }
};

// =======================
// Cập nhật lịch hẹn
// =======================
exports.update = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ error: "Không tìm thấy lịch hẹn" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Lỗi cập nhật lịch hẹn" });
  }
};

// =======================
// Xóa lịch hẹn
// =======================
exports.remove = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: "Không tìm thấy lịch hẹn" });

    res.json({ message: "Xóa lịch hẹn thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi xóa lịch hẹn" });
  }
};