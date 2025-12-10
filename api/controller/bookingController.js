const Booking = require("../models/booking");

// Tạo lịch hẹn
exports.create = async (req, res) => {
  try {
    const { fullName, phone, email, date, serviceId, staffId, note } = req.body;

    if (!fullName || !phone || !date || !serviceId) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
    }

    // Kiểm tra trùng lịch nếu có chọn thợ
    if (staffId) {
      const conflict = await Booking.findOne({ staffId, date, status: { $ne: "canceled" } });
      if (conflict) {
        return res.status(400).json({ error: "Thợ đã có lịch hẹn tại thời điểm này" });
      }
    }

    const booking = await Booking.create({
      fullName,
      phone,
      email,
      date,
      serviceId,
      staffId,
      note
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: "Lỗi tạo lịch hẹn", details: err.message });
  }
};

// Lấy tất cả lịch hẹn
exports.getAll = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("serviceId", "name price")
      .populate("staffId", "username email");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy danh sách lịch hẹn" });
  }
};

// Lấy 1 lịch hẹn
exports.getOne = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("serviceId", "name price")
      .populate("staffId", "username email");

    if (!booking) return res.status(404).json({ error: "Không tìm thấy lịch hẹn" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy lịch hẹn" });
  }
};

// Cập nhật trạng thái lịch hẹn
exports.update = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ error: "Không tìm thấy lịch hẹn" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Lỗi cập nhật lịch hẹn" });
  }
};

// Hủy lịch hẹn
exports.remove = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Không tìm thấy lịch hẹn" });

    booking.status = "canceled";
    await booking.save();

    res.json({ message: "Hủy lịch hẹn thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi hủy lịch hẹn" });
  }
};