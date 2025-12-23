import { useState, useEffect } from "react";
import axios from "axios";

export default function AppoinManager() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  // 📌 Lấy danh sách booking
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Lỗi lấy danh sách booking:", err));
  }, [token]);

  //  Xóa 1 booking
  const handleCancel = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa lịch này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
      alert("Xóa lịch hẹn thành công");
    } catch (err) {
      console.error("Lỗi xóa lịch:", err);
      alert(err.response?.data?.error || "xóa thất bại");
    }
  };

  //  Bộ lọc tìm kiếm theo số điện thoại hoặc email
  const filteredBookings = bookings.filter(
    (b) =>
      b.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.serviceId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">
        Quản lý lịch hẹn
      </h2>

      {/* Thanh tìm kiếm */}
      <div className="flex gap-3 items-center mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo dịch vụ, số điện thoại, email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-64 focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400"
        >
          Xóa tìm kiếm
        </button>
      </div>

      {/* Bảng danh sách booking */}
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2">STT</th>
            <th className="px-4 py-2">Dịch vụ</th>
            <th className="px-4 py-2">Số điện thoại</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Ngày hẹn</th>
            <th className="px-4 py-2">Ghi chú</th>
            <th className="px-4 py-2">Ngày tạo</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            filteredBookings.map((b, index) => (
              <tr key={b._id || index} className="hover:bg-gray-100 text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{b.serviceId?.name || "-"}</td>
                <td className="border px-4 py-2">{b.phone || "-"}</td>
                <td className="border px-4 py-2">{b.email || "-"}</td>
                <td className="border px-4 py-2">
                  {b.date ? new Date(b.date).toLocaleString() : "-"}
                </td>
                <td className="border px-4 py-2">{b.note || "-"}</td>
                <td className="border px-4 py-2">
                  {b.createdAt ? new Date(b.createdAt).toLocaleString() : "-"}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}