import { useState } from "react";
import axios from "axios";

export default function RegisterStaff() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    specialty: "",
    experience: 0,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Gửi yêu cầu đăng ký nhân viên (chưa được duyệt)
      const res = await axios.post("http://localhost:5000/api/staff/request", form);
      setMessage(res.data.message || "Yêu cầu đăng ký đã được gửi. Vui lòng chờ admin xác nhận.");
      setForm({
        fullName: "",
        password: "",
        specialty: "",
        experience: 0,
      });
    } catch (err) {
      setMessage(err.response?.data?.error || "Lỗi gửi yêu cầu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Đăng ký trở thành nhân viên
        </h1>

        <input
          name="fullName"
          placeholder="Họ tên"
          value={form.fullName}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3"
        />
        
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3"
        />
        
        <input
          name="specialty"
          placeholder="Chuyên môn (ví dụ: cắt tóc nam, tạo kiểu…)"
          value={form.specialty}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3"
        />
        <input
          type="number"
          name="experience"
          placeholder="Kinh nghiệm (năm)"
          value={form.experience}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-6"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : "Gửi Yêu Cầu"}
        </button>

        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </form>
    </div>
  );
}