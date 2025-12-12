import React, { useEffect, useState } from "react";
import avatar from "../assets/image/avatar.png";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "member",
    address: "",
    phone: "",
    avatar: "",
    birthday: "",
  });

  // Load current user
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        const res = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUser(data);
        setFormData({
          username: data.username || "",
          email: data.email || "",
          role: data.role || "member",
          address: data.address || "",
          phone: data.phone || "",
          avatar: data.avatar || "",
          birthday: data.birthday ? String(data.birthday).slice(0, 10) : "",
        });
      } catch (err) {
        console.log("Lỗi getMe:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const updated = await res.json();
      setUser(updated);
      setEditing(false);
      alert("Cập nhật thông tin thành công!");
    } catch (err) {
      console.log("Lỗi update:", err);
      alert("Cập nhật thất bại!");
    }
  };

  if (loading) return <div className="p-10 text-xl">Đang tải...</div>;
  if (!user)
    return <div className="p-10 text-xl text-red-500">Không tìm thấy user</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-72 bg-black text-white flex flex-col fixed h-full shadow-2xl">
        <div className="p-8 text-center border-b border-gray-800">
          <h1 className="text-4xl font-bold tracking-wider">BARBER</h1>
          <p className="text-sm text-gray-400 mt-1">Premium Studio</p>
        </div>

        {/* Avatar */}
        <div className="px-8 py-10 text-center">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-orange-600 overflow-hidden shadow-xl">
            <img
              src={
                user.avatar
                  ? user.avatar.startsWith("http")
                    ? user.avatar
                    : `http://localhost:5000${user.avatar}` // ghép base URL nếu avatar là path tương đối
                  : avatar // ảnh mặc định import từ assets
              }
              alt="avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                // fallback nếu URL lỗi
                e.currentTarget.src = avatar;
              }}
            />
          </div>
          <h2 className="mt-4 text-2xl font-bold">{user.username}</h2>
          <p className="text-orange-500 font-medium">{user.role}</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-6">
          <ul className="space-y-2">
            <li>
              <button className="flex items-center gap-4 w-full py-4 px-6 rounded-lg bg-orange-600">
                Biệt Danh : sai đẹp chiu
              </button>
            </li>
            
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-800">
          <button
            className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-72 p-10">
        <div className="max-w-5xl mx-auto">
          {/* Welcome */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-800">
              Chào mừng trở lại, {user.username}!
            </h1>
            <p className="text-gray-600 mt-2">
              Email: <span className="font-bold">{user.email}</span>
            </p>
          </div>

          {/* Profile Info / Edit */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Thông tin cá nhân
            </h3>

            {!editing ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                  <div>
                    <p className="text-gray-500">Tên đăng nhập</p>
                    <p className="font-bold text-gray-900">{user.username}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-bold text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Vai trò</p>
                    <p className="font-bold text-orange-600">{user.role}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Địa chỉ</p>
                    <p className="font-bold text-gray-900">
                      {user.address || "Chưa có"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Số điện thoại</p>
                    <p className="font-bold text-gray-900">
                      {user.phone || "Chưa có"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Ngày sinh</p>
                    <p className="font-bold text-gray-900">
                      {user.birthday
                        ? new Date(user.birthday).toLocaleDateString()
                        : "Chưa có"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-500">Avatar (URL)</p>
                    <p className="font-bold text-gray-900">
                      {user.avatar || "Chưa có"}
                    </p>
                  </div>
                </div>

                {/* Nút chỉnh sửa */}
                <div className="mt-8">
                  <button
                    onClick={() => setEditing(true)}
                    className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl"
                  >
                    Chỉnh sửa
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Tên đăng nhập"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Địa chỉ"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Số điện thoại"
                  />
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Avatar URL"
                  />
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    readOnly
                    className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
                    title="Vai trò không thể chỉnh sửa"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        username: user.username || "",
                        email: user.email || "",
                        role: user.role || "member",
                        address: user.address || "",
                        phone: user.phone || "",
                        avatar: user.avatar || "",
                        birthday: user.birthday
                          ? String(user.birthday).slice(0, 10)
                          : "",
                      });
                    }}
                    className="w-full md:w-1/3 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-xl"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="w-full md:w-2/3 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
