import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FE kiểm tra confirmPassword trước
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không trùng khớp!");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword, // GỬI LÊN SERVER
      });

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-sm mx-auto px-4">
        <div className="bg-orange-50 border border-orange-300 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">
            Đăng ký
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">

            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border border-orange-300 rounded px-4 py-2"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
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

            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-orange-300 rounded px-4 py-2"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold"
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-orange-500 font-medium">
                Đăng nhập ngay
              </Link>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
}
