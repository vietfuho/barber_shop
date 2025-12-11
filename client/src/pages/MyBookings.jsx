import { useState, useEffect } from "react";
import axios from "axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Lỗi lấy lịch hẹn của bạn:", err));
  }, [token]);

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
              <tr key={b._id}>
                <td>{index + 1}</td>
                <td>{new Date(b.date).toLocaleString()}</td>
                <td>{b.note || "-"}</td>
                <td>{new Date(b.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
