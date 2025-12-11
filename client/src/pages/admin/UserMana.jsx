import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserMana() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  // Lấy danh sách user
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Lỗi lấy danh sách user:", err));
  }, [token]);

  // Xóa user
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== id));
      alert("Xóa user thành công!");
    } catch (err) {
      console.error("Lỗi xóa user:", err);
    }
  };

  // Cập nhật role
  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${id}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(
        users.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );
      alert("Cập nhật role thành công!");
    } catch (err) {
      console.error("Lỗi cập nhật role:", err);
    }
  };

  // Bộ lọc tìm kiếm
  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      (u.username?.toLowerCase() || "").includes(term) ||
      (u.email?.toLowerCase() || "").includes(term) ||
      (u.phone?.toLowerCase() || "").includes(term)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">
        Quản lý người dùng
      </h2>

      {/* Thanh tìm kiếm */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email, số điện thoại..."
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

      {/* Bảng danh sách user */}
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2">STT</th>
            <th className="px-4 py-2">Tên đăng nhập</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Số điện thoại</th>
            <th className="px-4 py-2">Địa chỉ</th>
            <th className="px-4 py-2">Ngày sinh</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u, index) => (
            <tr key={u._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{u.username}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.phone || "-"}</td>
              <td className="border px-4 py-2">{u.address || "-"}</td>
              <td className="border px-4 py-2">
                {u.birthday ? new Date(u.birthday).toLocaleDateString() : "-"}
              </td>
              <td className="border px-4 py-2">
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u._id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  {["admin", "staff", "member"].map((role) => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => handleDelete(u._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600"
                >
                  Xóa
                </button>
                <Link
                  to={`/admin/users/${u._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
                >
                  Chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}