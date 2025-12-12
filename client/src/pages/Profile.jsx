import React, { useEffect, useState } from "react";
import defautAva from "../assets/image/defautAva.png";

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
    specialty: "",
    experience: "",
  });

  // FETCH CURRENT USER
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
          specialty: data.specialty || "",
          experience: data.experience || "",
        });
      } catch (err) {
        console.log("Lỗi getMe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // UPDATE PROFILE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const updatedUser = await res.json();
      setUser(updatedUser);

      alert("Cập nhật thông tin thành công!");
      setEditing(false);
    } catch (err) {
      console.log("Lỗi update:", err);
      alert("Cập nhật thất bại!");
    }
  };

  if (loading) return <div className="p-10 text-xl">Đang tải...</div>;
  if (!user) return <div className="p-10 text-xl text-red-500">Không tìm thấy user</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <div className="w-72 bg-black text-white flex flex-col fixed h-full shadow-xl">
        <div className="p-8 text-center border-b border-gray-800">
          <h1 className="text-4xl font-bold">BARBER</h1>
          <p className="text-sm text-gray-400">Premium Studio</p>
        </div>

        <div className="px-8 py-10 text-center">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-orange-600 overflow-hidden shadow-xl">
            <img src={defautAva} alt="" />
          </div>

          <h2 className="mt-4 text-2xl font-bold">{user.username}</h2>
          <p className="text-orange-500 font-medium">{user.role}</p>
        </div>

        <nav className="flex-1 px-6">
          <ul className="space-y-2">
            <li>
              <button className="flex items-center gap-4 w-full py-4 px-6 rounded-lg bg-orange-600">
                Biệt Danh : sai đẹp chiu
              </button>
            </li>
          </ul>
        </nav>

        <div className="p-6 border-t border-gray-800">
          <button
            className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-lg"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-72 p-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold">Chào mừng trở lại, {user.username}!</h1>
            <p className="text-gray-600 mt-2">
              Email: <span className="font-bold">{user.email}</span>
            </p>
          </div>

          {/* PROFILE */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Thông tin cá nhân</h3>

            {!editing ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                  <div>
                    <p className="text-gray-500">Tên đăng nhập</p>
                    <p className="font-bold">{user.username}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-bold">{user.email}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Vai trò</p>
                    <p className="font-bold text-orange-600">{user.role}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Địa chỉ</p>
                    <p className="font-bold">{user.address || "Chưa có"}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Số điện thoại</p>
                    <p className="font-bold">{user.phone || "Chưa có"}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Ngày sinh</p>
                    <p className="font-bold">
                      {user.birthday
                        ? new Date(user.birthday).toLocaleDateString()
                        : "Chưa có"}
                    </p>
                  </div>

                  {/* FIXED FIELD */}
                  <div>
                    <p className="text-gray-500">Chuyên ngành</p>
                    <p className="font-bold">{user.specialty || "Chưa có"}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Năm kinh nghiệm</p>
                    <p className="font-bold">
                      {user.experience ? `${user.experience} năm` : "Chưa có"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setEditing(true)}
                  className="w-full mt-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl"
                >
                  Chỉnh sửa
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="username" value={formData.username} onChange={handleChange} className="border p-2 rounded" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
                  <input type="text" placeholder="Địa chỉ" name="address" value={formData.address} onChange={handleChange} className="border p-2 rounded" />
                  <input type="text" placeholder="số điện thoại" name="phone" value={formData.phone} onChange={handleChange} className="border p-2 rounded" />
                  <input type="date"placeholder="ngày sinh" name="birthday" value={formData.birthday} onChange={handleChange} className="border p-2 rounded" />
                  <input type="url" name="avatar" value={formData.avatar} onChange={handleChange} className="border p-2 rounded" />

                  {/* NEW FIELDS */}
                  <input
                    type="text"
                    name="specialty"
                    placeholder="Chuyên ngành"
                    value={formData.specialty}
                    onChange={handleChange}
                   
                    className="border p-2 rounded"
                  />

                  <input
                    type="number"
                    name="experience"
                    placeholder="Số năm kinh nghiệm"
                    value={formData.experience}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />

                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    readOnly
                    className="border p-2 rounded bg-gray-100"
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        address: user.address,
                        phone: user.phone,
                        avatar: user.avatar,
                        birthday: user.birthday
                          ? String(user.birthday).slice(0, 10)
                          : "",
                        specialty: user.specialty || "",
                        experience: user.experience || "",
                      });
                    }}
                    className="w-1/3 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-xl"
                  >
                    Hủy
                  </button>

                  <button
                    type="submit"
                    className="w-2/3 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl"
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
