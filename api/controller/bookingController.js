const Booking = require("../models/booking");

// =======================
// Tạo lịch hẹn
// =======================
exports.create = async (req, res) => {
  try {
    const { fullName, phone, email, date, note } = req.body;

    // Validate dữ liệu bắt buộc
    if (!fullName || !phone || !date) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
    }

    // Kiểm tra token có user không (phòng trường hợp middleware không chạy)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Không xác định được người dùng" });
    }

    // Tạo booking và tự gán userId
    const booking = await Booking.create({
      fullName,
      phone,
      email,
      date,
      note,
      userId: req.user.id, // ⬅️ tự động lấy từ token
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

// Lấy lịch hẹn của chính chủ
// =======================

// Lấy 1 lịch hẹn của chính chủ theo ID
exports.getMyBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("serviceId");

    if (!booking) {
      return res.status(404).json({ error: "Không tìm thấy lịch hẹn" });
    }

    // Kiểm tra quyền: chỉ chính chủ mới được xem
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Bạn không có quyền xem lịch hẹn này" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy lịch hẹn", details: err.message });
  }
};