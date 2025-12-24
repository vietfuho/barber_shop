const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/ConnectDB.js");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 5000;

// connect to database
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ✅ Cho phép truy cập ảnh trong thư mục uploads
app.use("/uploads", express.static("uploads"));

// import routes tổng
const route = require("./routes/index_routes.js");
route(app);

// tạo server http
const server = http.createServer(app);

// khởi tạo socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // FE React
    methods: ["GET", "POST"]
  }
});

// lắng nghe kết nối socket
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join theo userId và role
  socket.on("join", ({ userId, role }) => {
    socket.join(userId);
    socket.data.userId = userId;
    socket.data.role = role; // lưu role vào socket
    console.log(`User ${userId} (${role}) joined room`);
  });

  // nhận tin nhắn từ client
  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    const msg = { senderId, receiverId, content, createdAt: new Date() };
    const senderRole = socket.data.role;

    if (senderRole === "member") {
      // member gửi → phát tới tất cả admin/staff
      for (const [id, s] of io.sockets.sockets) {
        if (s.data.role === "admin" || s.data.role === "staff") {
          io.to(s.id).emit("newMessage", msg);
        }
      }
    } else if (senderRole === "admin" || senderRole === "staff") {
      // admin/staff gửi → chỉ gửi tới member cụ thể
      io.to(receiverId).emit("newMessage", msg);
    }

    // gửi lại cho người gửi để hiển thị
    io.to(senderId).emit("newMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// listen port
server.listen(port, () => {
  console.log(`App + Socket.IO listening on port ${port}`);
});

module.exports = app;