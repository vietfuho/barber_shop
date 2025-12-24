import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StaffSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/my-schedule", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchedules(res.data || []);
      } catch (err) {
        console.error("Lỗi lấy lịch làm việc:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, [token]);

  if (loading) return <p className="text-center py-10">Đang tải lịch làm việc...</p>;

  return (
    <section className="py-12 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        {/* 2 nút chuyển đổi */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => navigate("/mybookings")}
            className="px-6 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300"
          >
            📅 Lịch hẹn khách hàng
          </button>
          <button
            className="px-6 py-2 rounded-lg font-semibold bg-orange-500 text-white"
          >
            📋 Lịch làm việc của tôi
          </button>
        </div>

        {schedules.length === 0 ? (
          <p className="text-gray-500 italic text-center">Không có lịch làm việc</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-orange-100">
                <th className="border px-4 py-2">Tên nhân viên</th>
                <th className="border px-4 py-2">Ngày</th>
                <th className="border px-4 py-2">Ca</th>
                <th className="border px-4 py-2">Giờ</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((s) => {
                const d = new Date(s.date);
                const dateStr = d.toLocaleDateString("vi-VN");
                const shiftLabel =
                  s.shift === "morning" ? " Sáng" :
                  s.shift === "afternoon" ? " Chiều" : " Tối";
                const shiftTime =
                  s.shift === "morning" ? "7h30 - 11h00" :
                  s.shift === "afternoon" ? "13h30 - 17h00" : "19h00 - 22h30";

                return (
                  <tr key={s._id}>
                    <td className="border px-4 py-2">{s.staffId?.username}</td>
                    <td className="border px-4 py-2">{dateStr}</td>
                    <td className="border px-4 py-2">{shiftLabel}</td>
                    <td className="border px-4 py-2">{shiftTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default StaffSchedule;