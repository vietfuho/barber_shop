import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);    // chứa thông tin user
    const [loading, setLoading] = useState(true);

    // Gọi API /users/me để lấy user hiện tại
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.log("Không có token → chưa login");
                    return;
                }

                const res = await fetch("http://localhost:5000/api/users/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });

                setUser(res.data);
            } catch (err) {
                console.log("Lỗi getMe:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMe();
    }, []);

    if (loading) return <div className="p-10 text-xl">Đang tải...</div>;
    if (!user) return <div className="p-10 text-xl text-red-500">Không tìm thấy user</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* ===== SIDEBAR ===== */}
            <div className="w-72 bg-black text-white flex flex-col fixed h-full shadow-2xl">

                <div className="p-8 text-center border-b border-gray-800">
                    <h1 className="text-4xl font-bold tracking-wider">BARBER</h1>
                    <p className="text-sm text-gray-400 mt-1">Premium Studio</p>
                </div>

                {/* Avatar */}
                <div className="px-8 py-10 text-center">
                    <div className="w-32 h-32 mx-auto rounded-full border-4 border-orange-600 overflow-hidden shadow-xl">
                        <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold">{user.username}</h2>
                    <p className="text-orange-500 font-medium">{user.role}</p>
                </div>

                {/* Menu */}
                <nav className="flex-1 px-6">
                    <ul className="space-y-2">
                        <li>
                            <button className="flex items-center gap-4 w-full py-4 px-6 rounded-lg bg-orange-600">
                                Profile
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center gap-4 w-full py-4 px-6 rounded-lg hover:bg-gray-900">
                                Lịch hẹn hôm nay
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

            {/* ===== MAIN CONTENT ===== */}
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

                    {/* Profile Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Thông tin cá nhân
                            </h3>

                            <div className="space-y-5 text-lg">
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
                            </div>

                            <button className="mt-8 w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl">
                                Chỉnh sửa
                            </button>
                        </div>

                        {/* Fake stats giữ nguyên */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white shadow-xl">
                                <p className="text-5xl font-black">156</p>
                                <p className="text-xl mt-2 opacity-90">Khách hôm nay</p>
                            </div>
                            <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-8 text-white shadow-xl">
                                <p className="text-5xl font-black">32.5M</p>
                                <p className="text-xl mt-2 opacity-90">Doanh thu tháng</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
