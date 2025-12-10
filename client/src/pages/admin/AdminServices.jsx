import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Lỗi lấy danh sách dịch vụ:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(services.filter((s) => s._id !== id));
      alert("Xóa dịch vụ thành công!");
    } catch (err) {
      console.error("Lỗi xóa dịch vụ:", err);
    }
  };

  const filteredServices = services.filter(
    (s) =>
      (s.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (s.category?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Link
          to="/admin/services/add"
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
        >
          + Thêm dịch vụ
        </Link>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded w-64 focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={() => setSearchTerm("")}
            className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400"
          >
            Xóa
          </button>
        </div>
      </div>

      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2">STT</th>
            <th className="px-4 py-2">Tên dịch vụ</th>
            <th className="px-4 py-2">Kiểu tóc</th>
            <th className="px-4 py-2">Mô tả</th>
            <th className="px-4 py-2">Giá</th>
            <th className="px-4 py-2">Thời gian</th>
            <th className="px-4 py-2">Ảnh</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((s, index) => (
            <tr key={s._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{s.name}</td>

              {/* Kiểu tóc: giờ chỉ là chuỗi */}
              <td className="border px-4 py-2">
                {s.styleOptions ? (
                  <span className="text-sm text-gray-700">{s.styleOptions}</span>
                ) : (
                  <span className="text-gray-400 text-sm">Không có</span>
                )}
              </td>

              <td className="border px-4 py-2">{s.description}</td>
              <td className="border px-4 py-2">{s.price?.toLocaleString()}đ</td>
              <td className="border px-4 py-2">{s.duration} phút</td>

              {/* Ảnh */}
              <td className="border px-4 py-2">
                {s.imageUrl ? (
                  <img
                    src={s.imageUrl}
                    alt={s.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                ) : s.imageFile ? (
                  <img
                    src={`http://localhost:5000/uploads/${s.imageFile}`}
                    alt={s.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Không có ảnh</span>
                )}
              </td>

              {/* Hành động */}
              <td className="border px-4 py-2 text-center space-x-2">
                <Link
                  to={`/services/details/${s._id}`}
                  className="bg-orange-500 text-white px-3 py-1 rounded shadow hover:bg-orange-600"
                >
                  Chi tiết
                </Link>
                <Link
                  to={`/admin/services/edit/${s._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
                >
                  Sửa
                </Link>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}