const User = require("../models/user");
const StaffRequest = require("../models/staffRequest");

// Phê duyệt yêu cầu trở thành staff
exports.approveRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    // Lấy yêu cầu theo id
    const request = await StaffRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Không tìm thấy yêu cầu" });
    }

    // Lấy user theo userId trong request
    const user = await User.findById(request.userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }

    // Chuyển role từ member thành staff
    user.role = "staff";
    await user.save();

    // Xóa yêu cầu sau khi phê duyệt
    await StaffRequest.findByIdAndDelete(requestId);

    return res.json({
      message: "Phê duyệt thành công, user đã trở thành staff",
      staff: user
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Từ chối yêu cầu
exports.rejectRequest = async (req, res) => {
  try {
    const updated = await StaffRequest.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Không tìm thấy yêu cầu" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Lỗi từ chối" });
  }
};

// Lấy tất cả yêu cầu
exports.GetAll = async (req, res) => {
  try {
    const requests = await StaffRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};