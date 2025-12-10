import React from "react";
import { Link } from "react-router-dom";

const HomeAdmin = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center">
          Trang quản trị Admin
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Chào mừng bạn đến với khu vực quản trị. Tại đây bạn có thể quản lý dịch vụ,
          xem lịch hẹn và thực hiện các chức năng dành riêng cho admin.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quản lý dịch vụ */}
          <Link
            to="/admin/services"
            className="bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 p-6 text-center font-semibold transition"
          >
            Quản lý dịch vụ
          </Link>

          {/* Quản lý lịch hẹn */}
          <Link
            to="/admin/bookings"
            className="bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 p-6 text-center font-semibold transition"
          >
            Quản lý lịch hẹn
          </Link>

          {/* Quản lý người dùng */}
          <Link
            to="/admin/users"
            className="bg-green-500 text-white rounded-lg shadow hover:bg-green-600 p-6 text-center font-semibold transition"
          >
            Quản lý người dùng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;