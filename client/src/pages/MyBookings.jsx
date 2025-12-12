import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentUserId = payload.id;

        const res = await axios.get("http://localhost:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const myBookings = res.data.filter((b) => b.userId === currentUserId);
        setBookings(myBookings);
      } catch (err) {
        console.error("Lỗi lấy lịch hẹn:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  // ✅ Hàm hủy lịch
  const handleCancel = async (id) => {
    if (!window.confirm("Bạn có chắc muốn hủy lịch này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Xóa lịch khỏi state
      setBookings((prev) => prev.filter((b) => b._id !== id));
      alert("Hủy lịch hẹn thành công");
    } catch (err) {
      console.error("Lỗi hủy lịch:", err);
      alert(err.response?.data?.error || "Hủy lịch thất bại");
    }
  };

  return (
    <section className="py-16 bg-white">
      {/* dùng layout giống Navbar/Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-orange-50 border border-orange-300 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
            Lịch hẹn 
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
          ) : bookings.length === 0 ? (
            <p className="text-center text-gray-500">Bạn chưa có lịch hẹn nào.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="px-4 py-2">STT</th>
                    <th className="px-4 py-2">Họ và tên</th>
                    <th className="px-4 py-2">Số điện thoại</th>
                    <th className="px-4 py-2">Ngày hẹn</th>
                    <th className="px-4 py-2">Ghi chú</th>
                    <th className="px-4 py-2">Ngày tạo</th>
                    <th className="px-4 py-2">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, index) => (
                    <tr
                      key={b._id}
                      className="text-center border-b hover:bg-orange-100"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{b.fullName}</td>
                      <td className="px-4 py-2">{b.phone}</td>
                      <td className="px-4 py-2">
                        {b.date ? new Date(b.date).toLocaleString() : "-"}
                      </td>
                      <td className="px-4 py-2">{b.note || "Không có"}</td>
                      <td className="px-4 py-2">
                        {b.createdAt
                          ? new Date(b.createdAt).toLocaleString()
                          : "-"}
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => navigate(`/edit-appoint/${b._id}`)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleCancel(b._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Hủy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}