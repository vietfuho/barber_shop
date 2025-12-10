const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/ConnectDB.js");

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

// listen port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;