import { useState, useEffect } from "react";
import axios from "axios";

export default function RegisterStaff() {
  const [form, setForm] = useState({
    specialty: "",       // ✅ thêm chuyên môn
    experience: 0,
    description: "",
    level: "beginner",
    workerRole: "chinh",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get("http://localhost:5000/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setRole(res.data.role))
          .catch(() => setRole(""));
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!form.specialty || !form.experience || !form.description) {
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
        specialty: "",
        experience: 0,
        description: "",
        level: "beginner",
        workerRole: "chinh",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Lỗi gửi yêu cầu");
    } finally {
      setLoading(false);
    }
  };

  if (role === "admin" || role === "staff") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-6">
            ❌ Chỉ member mới được phép đăng ký trở thành thợ
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow w-full max-w-md">
        <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Đăng ký trở thành nhân viên
        </h1>

        {/* ✅ Input chuyên môn */}
        <input
          type="text"
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
          className="w-full p-3 border rounded mb-3"
        />

        <textarea
          name="description"
          placeholder="Mô tả về bản thân"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3 h-32 resize-none"
        />

        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3"
        >
          <option value="beginner">Trình độ: Mới bắt đầu</option>
          <option value="intermediate">Trình độ: Trung cấp</option>
          <option value="advanced">Trình độ: Cao cấp</option>
        </select>

        <select
          name="workerRole"
          value={form.workerRole}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-6"
        >
          <option value="chinh">Vai trò: Thợ chính</option>
          <option value="phu">Vai trò: Thợ phụ</option>
          <option value="freelancer">Vai trò: Freelancer</option>
        </select>

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
              message.startsWith("✅") ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}