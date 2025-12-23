import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPass = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShow = (key) => {
    setShow({ ...show, [key]: !show[key] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    if (!token) {
      setMessage("❌ Bạn chưa đăng nhập");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("❌ Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setMessage("✅ Đổi mật khẩu thành công");

      // quay lại trang trước sau 1 chút
      setTimeout(() => navigate(-1), 1200);
    } catch (err) {
      setMessage(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "❌ Đổi mật khẩu thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">
          🔐 Đổi mật khẩu
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* MẬT KHẨU CŨ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mật khẩu hiện tại
            </label>
            <div className="relative">
              <input
                type={show.old ? "text" : "password"}
                name="oldPassword"
                required
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => toggleShow("old")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {show.old ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* MẬT KHẨU MỚI */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={show.new ? "text" : "password"}
                name="newPassword"
                required
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => toggleShow("new")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {show.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* XÁC NHẬN */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Xác nhận mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={show.confirm ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => toggleShow("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {show.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-60"
          >
            {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-semibold ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default ResetPass;
