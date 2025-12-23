import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const service = state?.service;

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    date: "",
    time: "",
    note: "",
  });

  if (!service) {
    return (
      <p className="text-center text-red-500 py-10">
        Không có dịch vụ được chọn
      </p>
    );
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      const confirmLogin = window.confirm(
        "⚠️ Bạn cần đăng nhập trước khi đặt lịch. Bạn có muốn đăng nhập ngay?"
      );
      if (confirmLogin) {
        navigate("/login");
      }
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId: service._id,
          phone: formData.phone,
          email: formData.email,
          date: `${formData.date}T${formData.time}:00`,
          note: formData.note,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Có lỗi xảy ra: " + (err.error || "Không thể đặt lịch"));
        return;
      }

      const goToBookings = window.confirm(
        "🎉 Đặt lịch thành công!\n\nBạn muốn xem lịch hẹn của mình ngay bây giờ?"
      );

      if (goToBookings) {
        navigate("/mybookings");
      } else {
        navigate("/services");
      }
    } catch (error) {
      alert("Lỗi kết nối server: " + error.message);
    }
  };

  return (
    <section className="py-12 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Đặt lịch dịch vụ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Dịch vụ đã chọn
            </label>
            <input
              value={service.name}
              disabled
              className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              name="phone"
              placeholder="Nhập số điện thoại"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Nhập email"
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Ngày
              </label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Giờ
              </label>
              <input
                type="time"
                name="time"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Ghi chú
            </label>
            <textarea
              name="note"
              placeholder="Thêm ghi chú nếu cần..."
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md"
          >
            Xác nhận đặt lịch
          </button>
        </form>
      </div>
    </section>
  );
}
