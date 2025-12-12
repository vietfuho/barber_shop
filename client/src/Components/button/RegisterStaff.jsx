import { useState } from "react";
import axios from "axios";

export default function RegisterStaff() {
  const [form, setForm] = useState({
    usernameOrEmail: "",
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

    // simple validation
    if (!form.usernameOrEmail || !form.phone || !form.specialty) {
      setMessage("❌ Vui lòng nhập đầy đủ thông tin");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/staff/request", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("✅ Yêu cầu đã được gửi. Vui lòng chờ admin phê duyệt.");

      setForm({
        usernameOrEmail: "",
        phone: "",
        specialty: "",
        experience: 0,
      });
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Lỗi gửi yêu cầu");
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
          name="usernameOrEmail"
          placeholder="Username hoặc Email"
          value={form.usernameOrEmail}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3"
        />

        <input
          name="phone"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3"
        />

        <input
          name="specialty"
          placeholder="Chuyên môn (ví dụ: cắt tóc, tạo kiểu…)"
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

        {message && (
          <p
            className={`mt-4 text-center ${
              message.startsWith("✅")
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
