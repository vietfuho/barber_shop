import React, { useEffect, useState } from "react";
import axios from "axios";

const Aprove = () => {
  const [requests, setRequests] = useState([]);

  // Lấy danh sách request
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📌 API trả về:", res.data); // debug

        setRequests(res.data);
      } catch (err) {
        console.error("❌ Lỗi lấy yêu cầu:", err.response?.data || err.message);
      }
    };

    fetchRequests();
  }, []);

  // ---- PHÊ DUYỆT ----
  const approve = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/approve/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✔ Phê duyệt:", res.data);

      // Xóa phần tử đã phê duyệt khỏi danh sách
      setRequests((prev) => prev.filter((r) => r._id !== id));

      alert("✔ Phê duyệt thành công!");
    } catch (err) {
      alert("❌ Lỗi phê duyệt!");
      console.error(err.response?.data || err.message);
    }
  };

  // ---- TỪ CHỐI ----
  const deny = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/reject/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("⛔ Từ chối:", res.data);

      setRequests((prev) => prev.filter((r) => r._id !== id));
      alert("⛔ Yêu cầu đã bị từ chối!");
    } catch (err) {
      alert("❌ Lỗi từ chối!");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Danh sách yêu cầu nhân viên
      </h1>

      {requests.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          <p>Không có yêu cầu nào cần phê duyệt.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((r) => (
            <div
              key={r._id}
              className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              {/* TIÊU ĐỀ */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {r.username || r.email || "Không có tên"}
              </h3>

              <div className="space-y-1 text-gray-700">
                <p>
                  📞 <b>SĐT:</b> {r.phone || "Chưa có"}
                </p>
                <p>
                  💼 <b>Chuyên môn:</b> {r.specialty || "—"}
                </p>
                <p>
                  🕒 <b>Kinh nghiệm:</b>{" "}
                  {r.experience ? `${r.experience} năm` : "—"}
                </p>
                <p>
                  🔖 <b>Trạng thái:</b>{" "}
                  <span className="px-2 py-1 bg-yellow-200 text-yellow-700 rounded-md text-sm">
                    {r.status || "pending"}
                  </span>
                </p>
                <p className="text-sm text-gray-400">
                  Ngày gửi:{" "}
                  {r.createdAt
                    ? new Date(r.createdAt).toLocaleString("vi-VN")
                    : "—"}
                </p>
              </div>

              {/* KHU VỰC NÚT */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => approve(r._id)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  ✔ Phê duyệt
                </button>

                <button
                  onClick={() => deny(r._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  ✖ Từ chối
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Aprove;
