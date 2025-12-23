import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditAppoin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [booking, setBooking] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    date: "",
    time: "",
    note: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bk = res.data;

        setBooking(bk);

        const dt = bk.date ? new Date(bk.date) : null;
        setFormData({
          phone: bk.phone || "",
          email: bk.email || "",
          date: dt ? dt.toISOString().split("T")[0] : "",
          time: dt ? dt.toISOString().split("T")[1].slice(0, 5) : "",
          note: bk.note || "",
        });
      } catch (err) {
        console.log(err);
        setMessage("❌ Không tìm thấy lịch hẹn");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id, token]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        {
          phone: formData.phone,
          email: formData.email,
          date: `${formData.date}T${formData.time}:00`,
          note: formData.note,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Cập nhật lịch hẹn thành công");
      navigate("/mybookings");
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Lỗi cập nhật lịch hẹn");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Đang tải dữ liệu...</p>;
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">{message || "Không có dữ liệu lịch hẹn"}</p>
          <button
            onClick={() => navigate("/mybookings")}
            className="mt-4 px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    );
  }

  const service = booking.serviceId; // populate từ backend
  const dtCurrent = booking.date ? new Date(booking.date) : null;
  const dateStr = dtCurrent ? dtCurrent.toLocaleDateString("vi-VN") : "";
  const timeStr = dtCurrent
    ? dtCurrent.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    : "";

  const imageSrc =
    service?.imageUrl
      ? service.imageUrl
      : service?.imageFile
      ? `http://localhost:5000/uploads/${service.imageFile}`
      : "https://via.placeholder.com/600x400";

  return (
    <section className="py-12 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header: thông tin dịch vụ + lịch hẹn hiện tại */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 w-full relative">
            <img
              src={imageSrc}
              alt={service?.name || "Dịch vụ"}
              className="w-full h-64 md:h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/600x400";
              }}
            />
            {service?.isActive === false && (
              <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Ngừng hoạt động
              </span>
            )}
          </div>

          <div className="md:w-1/2 w-full p-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-orange-600">
              {service?.name || "Dịch vụ"}
            </h1>
            <p className="text-gray-700 mt-2">{service?.description || "Không có mô tả"}</p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Thời lượng dịch vụ:</span> {service?.duration ?? 0} phút
              </p>
              <p>
                <span className="font-semibold">Giá:</span>{" "}
                <span className="text-orange-600 font-bold">
                  {(service?.price ?? 0).toLocaleString()} VNĐ
                </span>
              </p>
              <p>
                <span className="font-semibold">Ngày hẹn hiện tại:</span> {dateStr}
              </p>
              <p>
                <span className="font-semibold">Giờ hẹn hiện tại:</span> {timeStr}
              </p>
              <p>
                <span className="font-semibold">SĐT hiện tại:</span> {booking.phone}
              </p>
              {booking.email && (
                <p>
                  <span className="font-semibold">Email hiện tại:</span> {booking.email}
                </p>
              )}
              {booking.note && (
                <p className="sm:col-span-2">
                  <span className="font-semibold">Ghi chú hiện tại:</span> {booking.note}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form chỉnh sửa */}
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Chỉnh sửa lịch hẹn của bạn
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Phải bắt đầu bằng 0 và chỉ chứa số"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email (tùy chọn)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Nhập email nếu cần"
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
                  value={formData.date}
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
                  value={formData.time}
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
                value={formData.note}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Thêm ghi chú nếu cần..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                type="submit"
                className="flex-1 bg-orange-600 hover:bg-amber-600 text-white px-6 py-3 rounded-lg text-base font-semibold transition"
              >
                Lưu thay đổi
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-white border border-orange-500 text-orange-600 px-6 py-3 rounded-lg text-base font-semibold hover:bg-orange-50 transition"
              >
                ← Quay lại
              </button>
            </div>
          </form>

          {message && (
            <p className="mt-4 text-center text-red-600 font-semibold">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
}