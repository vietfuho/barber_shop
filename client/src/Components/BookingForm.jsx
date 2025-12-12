import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function BookingForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    date: "",
    time: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, date: e.target.value, time: "" });
  };

  // ======================= Tạo time slots =======================
  const timeOptions = useMemo(() => {
    if (!formData.date) return [];
    const date = new Date(formData.date + "T00:00:00");
    const day = date.getDay(); // 0 = Chủ nhật
    const isWeekend = day === 0 || day === 6;
    const startHour = isWeekend ? 8 : 9;
    const endHour = isWeekend ? 22 : 21;

    const slots = [];
    for (let h = startHour; h <= endHour; h++) {
      for (const m of [0, 30]) {
        if (h === endHour && m > 0) continue;
        const hh = String(h).padStart(2, "0");
        const mm = String(m).padStart(2, "0");
        slots.push(`${hh}:${mm}`);
      }
    }
    return slots;
  }, [formData.date]);

  // ======================= Submit form =======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: "Bearer " + token }),
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          date: `${formData.date}T${formData.time}:00`,
          note: formData.note,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Đặt lịch thành công!");
        setFormData({
          fullName: "",
          phone: "",
          date: "",
          time: "",
          note: "",
        });
        navigate("/mybookings");
      } else {
        alert("Có lỗi: " + (data.error || "Không xác định"));
      }
    } catch (err) {
      console.error("Error booking:", err);
      alert("Không thể kết nối server");
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-md mx-auto px-3">
        <div className="bg-white border border-orange-400 rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">
            Đặt lịch hẹn
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs text-neutral-800">
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên *"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-orange-300 rounded px-3 py-1.5 text-sm"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại *"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-orange-300 rounded px-3 py-1.5 text-sm"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleDateChange}
                required
                className="w-full border border-orange-300 rounded px-3 py-1.5 text-sm"
              />
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                disabled={!formData.date}
                className="w-full border border-orange-300 rounded px-3 py-1.5 text-sm disabled:bg-gray-100 disabled:text-gray-400"
              >
                <option value="">
                  {formData.date ? "Chọn giờ" : "Chọn ngày trước"}
                </option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows="2"
              placeholder="Ghi chú thêm..."
              className="w-full border border-orange-300 rounded px-3 py-1.5 text-sm resize-none"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded font-semibold text-sm transition"
            >
              Xác nhận đặt lịch
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}