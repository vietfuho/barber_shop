import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        usernameOrEmail: formData.email, // backend nhận email hoặc username
        password: formData.password,
      });

      console.log("Login response:", res.data);

      // ✅ Lưu token vào localStorage (backend trả về field 'token')
      localStorage.setItem("token", res.data.token);

      alert(res.data.message || "Đăng nhập thành công");

      if (onLoginSuccess) onLoginSuccess(); // cập nhật Navbar
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data);
      alert(err.response?.data?.error || "Lỗi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-sm mx-auto px-4">
        <div className="bg-orange-50 border border-orange-300 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">
            Đăng nhập
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Chào mừng bạn trở lại Elite Barber
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <input
              type="email"
              name="email"
              placeholder="Email hoặc Username"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-orange-300 rounded px-4 py-2"
            />

            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-orange-300 rounded px-4 py-2"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold"
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            <div className="text-center text-xs text-gray-500 mt-4">
              Hoặc đăng nhập với
              <div className="flex justify-center gap-4 mt-2">
                <button className="bg-white gap-1 flex items-center justify-center border px-3 py-1 rounded text-black text-sm">
                  <FaGoogle /> Google
                </button>
                <button className="bg-white gap-1 flex items-center justify-center border px-3 py-1 rounded text-black text-sm">
                  <FaFacebook className="text-blue-600" /> Facebook
                </button>
              </div>
              <p className="mt-4">
                Chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  className="text-orange-500 font-medium hover:underline"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}