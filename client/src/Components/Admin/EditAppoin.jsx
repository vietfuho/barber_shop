import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditAppoin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    date: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load booking theo id
  useEffect(() => {
    const load = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const b = res.data;
        setFormData({
          fullName: b.fullName || "",
          phone: b.phone || "",
          date: b.date ? new Date(b.date).toISOString().slice(0, 16) : "",
          note: b.note || "",
        });
      } catch (err) {
        alert(err.response?.data?.error || "Không tải được lịch hẹn");
        navigate("/mybookings");
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // chặn reload
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Cập nhật lịch hẹn thành công");
      navigate("/mybookings"); // quay lại danh sách
    } catch (err) {
      alert(err.response?.data?.error || "Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-6 text-center text-gray-600">Đang tải dữ liệu...</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-sm mx-auto px-4">
        <div className="bg-orange-50 border border-orange-300 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">
            Sửa lịch hẹn
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-orange-300 rounded px-4 py-2"
            />

            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-orange-300 rounded px-4 py-2"
            />

            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-orange-300 rounded px-4 py-2"
            />

            <textarea
              name="note"
              placeholder="Ghi chú"
              value={formData.note}
              onChange={handleChange}
              className="w-full border border-orange-300 rounded px-4 py-2"
              rows="3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold"
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              <button
                type="button"
                onClick={() => navigate("/mybookings")}
                className="text-orange-500 font-medium"
              >
                Quay lại lịch hẹn của tôi
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}