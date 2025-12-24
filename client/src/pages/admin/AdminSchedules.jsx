import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminWeeklySchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [weekStart, setWeekStart] = useState(getMonday(new Date()));
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ staffId: "", date: "", shift: "morning" });
  const token = localStorage.getItem("token");

  // Lấy ngày thứ 2 đầu tuần
  function getMonday(d) {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/schedules", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setSchedules(res.data)).catch(err => console.error(err));
  }, [token]);

  const daysOfWeek = [...Array(7)].map((_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const getSchedulesForDayShift = (date, shift) => {
    const dateStr = date.toISOString().split("T")[0];
    return schedules.filter(s =>
      new Date(s.date).toISOString().split("T")[0] === dateStr && s.shift === shift
    );
  };

  const changeWeek = dir => {
    const newDate = new Date(weekStart);
    newDate.setDate(weekStart.getDate() + (dir === "next" ? 7 : -7));
    setWeekStart(newDate);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/schedule", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Tạo lịch thành công");
      setShowForm(false);
      setFormData({ staffId: "", date: "", shift: "morning" });
      const res = await axios.get("http://localhost:5000/api/admin/schedules", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchedules(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "❌ Không thể tạo lịch");
    }
  };

  return (
    <section className="py-12 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">Lịch làm việc theo tuần</h2>

        {/* Thanh điều khiển */}
        <div className="flex justify-between items-center mb-6">
          {/* Nút tạo lịch bên trái */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            {showForm ? "Đóng form" : "➕ Tạo lịch"}
          </button>

          {/* Nhóm nút tuần bên phải */}
          <div className="flex gap-4">
            <button onClick={() => changeWeek("prev")} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
              « Tuần trước
            </button>
            <button onClick={() => setWeekStart(getMonday(new Date()))} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
              Hôm nay
            </button>
            <button onClick={() => changeWeek("next")} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
              Tuần sau »
            </button>
          </div>
        </div>

        {/* Form tạo lịch */}
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-lg bg-gray-50 mb-8">
            <input
              name="staffId"
              value={formData.staffId}
              onChange={e => setFormData({ ...formData, staffId: e.target.value })}
              placeholder="ID nhân viên"
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              min={new Date().toISOString().split("T")[0]} // chỉ cho phép từ hôm nay trở đi
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
            <select
              name="shift"
              value={formData.shift}
              onChange={e => setFormData({ ...formData, shift: e.target.value })}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="morning">🌅 Sáng (7h30 - 11h00)</option>
              <option value="afternoon">🌞 Chiều (13h30 - 17h00)</option>
              <option value="evening">🌙 Tối (19h00 - 22h30)</option>
            </select>
            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg">Xác nhận tạo lịch</button>
          </form>
        )}

        {/* Bảng tuần */}
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-orange-100">
              <th rowSpan="2" className="border px-4 py-2">Ca</th>
              {daysOfWeek.map((d, i) => (
                <th key={i} className="border px-4 py-2">
                  {d.toLocaleDateString("vi-VN", { day: "numeric", month: "numeric" })}
                </th>
              ))}
            </tr>
            <tr className="bg-orange-50">
              {daysOfWeek.map((d, i) => (
                <th key={i} className="border px-4 py-2">
                  {d.toLocaleDateString("vi-VN", { weekday: "short" })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { key: "morning", label: "Sáng (7h30 - 11h00)" },
              { key: "afternoon", label: "Chiều (13h30 - 17h00)" },
              { key: "evening", label: "Tối (19h00 - 22h30)" }
            ].map(shift => (
              <tr key={shift.key}>
                <td className="border px-4 py-2 font-semibold">{shift.label}</td>
                {daysOfWeek.map((d, i) => {
                  const list = getSchedulesForDayShift(d, shift.key);
                  return (
                    <td key={i} className="border px-4 py-2 text-sm">
                      {list.length === 0 ? <span className="text-gray-400 italic">-</span> : list.map(s => <div key={s._id}>{s.staffId?.username}</div>)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminWeeklySchedule;