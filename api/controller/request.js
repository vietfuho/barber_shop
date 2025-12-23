const StaffRequest = require("../models/staffRequest");

// Member gửi yêu cầu
exports.createRequest = async (req, res) => {
  try {
    const { specialty, experience, description, level, workerRole } = req.body;

    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Không xác định được người dùng" });
    }

    if (req.user.role !== "member") {
      return res.status(403).json({ message: "Chỉ thành viên mới có thể gửi yêu cầu trở thành thợ" });
    }

    const existingRequest = await StaffRequest.findOne({ userId: req.user.id });
    if (existingRequest) {
      return res.status(400).json({ message: "Bạn đã gửi yêu cầu trước đó. Không thể gửi thêm." });
    }

    const newRequest = new StaffRequest({
      userId: req.user.id,
      email: req.user.email,
      username: req.user.username,
      phone: req.user.phone,
      address: req.user.address,
      role: req.user.role,
      avatar: req.user.avatar,
      specialty,
      experience,
      description,
      level,
      workerRole
    });

    await newRequest.save();

    res.status(201).json({
      message: "Yêu cầu đăng ký nhân viên đã được gửi",
      request: newRequest
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin xem tất cả yêu cầu
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await StaffRequest.find().populate("userId");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin duyệt hoặc từ chối yêu cầu
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body; // "approved" hoặc "rejected"
    const request = await StaffRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Không tìm thấy yêu cầu" });
    }

    request.status = status;
    await request.save();

    res.json({ message: "Cập nhật trạng thái thành công", request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};