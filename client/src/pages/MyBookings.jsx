import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data || []);
      } catch (err) {
        console.error("Lỗi lấy lịch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter((b) => b._id !== id));
      alert("Xóa lịch hẹn thành công");
    } catch (err) {
      console.error("Lỗi xóa:", err);
      alert("Không thể xóa lịch hẹn");
    }
  };

  const handleCompleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter((b) => b._id !== id));
      alert(" Hoàn thành và xóa lịch hẹn thành công");
    } catch (err) {
      console.error("Lỗi hoàn thành:", err);
      alert("Không thể hoàn thành lịch hẹn");
    }
  };

  if (loading) return <p className="text-center py-10">Đang tải lịch...</p>;

  const filteredBookings = bookings.filter((b) =>
    b.email?.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <section className="py-12 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">

        {/* Staff: 2 nút chuyển đổi */}
        {role === "staff" ? (
          <div className="flex justify-center gap-6 mb-8">
            <button className="px-6 py-2 rounded-lg font-semibold bg-orange-500 text-white">
              📅 Lịch hẹn khách hàng
            </button>
            <button
              onClick={() => navigate("/staffschedule")}
              className="px-6 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300"
            >
              📋 Lịch làm việc của tôi
            </button>
          </div>
        ) : (
          <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
            📅 Lịch hẹn của tôi
          </h2>
        )}

        {/* Ô tìm kiếm email */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm theo email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {filteredBookings.length === 0 ? (
          <p className="text-gray-500 italic text-center">Không có lịch hẹn phù hợp</p>
        ) : role === "staff" ? (
          /* Staff: hiển thị dạng bảng */
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-orange-100">
                <th className="border px-4 py-2">Dịch vụ</th>
                <th className="border px-4 py-2">Ngày</th>
                <th className="border px-4 py-2">Giờ</th>
                <th className="border px-4 py-2">SĐT</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Ghi chú</th>
                <th className="border px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => {
                const d = new Date(b.date);
                const dateStr = d.toLocaleDateString("vi-VN");
                const timeStr = d.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <tr key={b._id}>
                    <td className="border px-4 py-2">{b.serviceId?.name}</td>
                    <td className="border px-4 py-2">{dateStr}</td>
                    <td className="border px-4 py-2">{timeStr}</td>
                    <td className="border px-4 py-2">{b.phone}</td>
                    <td className="border px-4 py-2">{b.email}</td>
                    <td className="border px-4 py-2">{b.note}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleCompleteBooking(b._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        Hoàn thành
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          /* Member: hiển thị dạng card */
          <div className="space-y-4">
            {filteredBookings.map((b) => {
              const d = new Date(b.date);
              const dateStr = d.toLocaleDateString("vi-VN");
              const timeStr = d.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <div
                  key={b._id}
                  className="border rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{b.serviceId?.name}</p>
                    <p>📅 {dateStr}</p>
                    <p>⏰ {timeStr}</p>
                    <p>📞 {b.phone}</p>
                    <p>✉️ {b.email}</p>
                    <p>📝 {b.note}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/edit-appoint/${b._id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDeleteBooking(b._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBookings;