const Booking = require("../models/booking");

// Tạo lịch hẹn
exports.create = async (req, res) => {
  try {
    const { phone, email, date, note, serviceId } = req.body;
    if (!phone || !date || !serviceId) return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
    if (!req.user?.id) return res.status(401).json({ error: "Không xác định được người dùng" });
    if (!email || email !== req.user.email) return res.status(400).json({ error: "Email không khớp với tài khoản đăng nhập" });
    if (!/^0\d+$/.test(phone)) return res.status(400).json({ error: "Số điện thoại không hợp lệ" });

    const appointmentDate = new Date(date);
    if (appointmentDate < new Date()) return res.status(400).json({ error: "Ngày hẹn phải từ hiện tại trở đi" });

    const existed = await Booking.findOne({ userId: req.user.id, date: appointmentDate });
    if (existed) return res.status(409).json({ error: "Bạn đã có lịch hẹn tại thời điểm này" });

    const booking = await Booking.create({ phone, email, date: appointmentDate, note, serviceId, userId: req.user.id });
    res.status(201).json(await booking.populate("serviceId"));
  } catch (err) {
    res.status(500).json({ error: "Lỗi tạo lịch hẹn", details: err.message });
  }
};

// Lấy tất cả lịch hẹn
exports.getAll = async (req, res) => {
  try {
    const query = req.user.role === "member" ? { userId: req.user.id } : {};
    const bookings = await Booking.find(query).populate("serviceId").sort({ date: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy danh sách lịch hẹn" });
  }
};

// Lấy lịch hẹn theo ID
exports.getOne = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("serviceId");
    if (!booking) return res.status(404).json({ error: "Không tìm thấy lịch hẹn" });

    if (req.user.role === "member" && booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Không có quyền xem lịch hẹn này" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy lịch hẹn" });
  }
};



// Cập nhật lịch hẹn
exports.update = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Không tìm thấy lịch hẹn" });

    if (req.user.role === "member" && booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Không có quyền sửa lịch hẹn này" });
    }

    Object.assign(booking, req.body);
    await booking.save();
    res.json({ message: "✅ Cập nhật lịch hẹn thành công", booking });
  } catch (err) {
    res.status(500).json({ error: "Lỗi cập nhật lịch hẹn" });
  }
};

// Xóa lịch hẹn
exports.remove = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Không tìm thấy lịch hẹn" });

    if (req.user.role === "member" && booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Không có quyền xóa lịch hẹn này" });
    }

    await booking.deleteOne();
    res.json({ message: "Xóa lịch hẹn thành công" });
  } catch (err) {
    res.status(500).json({ error: "Xóa lịch hẹn thất bại", details: err.message });
  }
};