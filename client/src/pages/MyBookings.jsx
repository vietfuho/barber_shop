import { useState, useEffect } from "react";
import axios from "axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
  const fetchBookings = async () => {
    if (!token) {
      setLoading(false); 
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Lỗi lấy lịch hẹn:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchBookings();
}, [token]);


  // --- UI ---
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">Đang tải dữ liệu...</div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">
        Lịch hẹn của tôi
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">Bạn chưa có lịch hẹn nào.</p>
      ) : (
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-2">STT</th>
              <th className="px-4 py-2">Ngày hẹn</th>
              <th className="px-4 py-2">Ghi chú</th>
              <th className="px-4 py-2">Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={b._id} className="text-center">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  {b.date ? new Date(b.date).toLocaleString() : "-"}
                </td>
                <td className="px-4 py-2">{b.note || "Không có"}</td>
                <td className="px-4 py-2">
                  {b.createdAt ? new Date(b.createdAt).toLocaleString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}