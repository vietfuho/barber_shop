const multer = require("multer");
const path = require("path");

// Cấu hình nơi lưu file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // thư mục lưu ảnh
  },
  filename: function (req, file, cb) {
    // đặt tên file: thời gian + tên gốc
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Chỉ cho phép file ảnh
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ hỗ trợ file ảnh!"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;