const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Đăng ký
exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;

    // 1. Kiểm tra thiếu trường
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
    }

    // 2. Kiểm tra trùng mật khẩu
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Mật khẩu xác nhận không trùng khớp." });
    }

    // 3. Kiểm tra username tồn tại
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại." });
    }

    // 4. Kiểm tra email tồn tại
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email đã được sử dụng." });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Tạo user mới (cho phép chọn role, mặc định member)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role && ["admin", "staff", "member"].includes(role) ? role : "member",
    });

    await newUser.save();

    return res.status(201).json({
      message: "Đăng ký thành công!",
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Tìm user theo username hoặc email
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });
    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy user" });
    }

    // So sánh mật khẩu (bcrypt hash)
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Sai mật khẩu" });
    }

    // Nếu là admin thì log riêng
    if (user.role === "admin") {
      console.log("Admin login thành công:", user.username);
    }

    // Tạo JWT token kèm role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Loại bỏ password khi trả về
    const { password: _, ...userData } = user.toObject();

    // Trả về token + role + thông tin user
    return res.json({
      message: "Đăng nhập thành công",
      token,
      role: user.role,
      user: userData
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Lỗi đăng nhập" });
  }
};