import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-8">Dashboard</h1>

      {/* Cards thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Người dùng</h2>
          <p className="text-2xl font-bold text-orange-600">120</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Dịch vụ</h2>
          <p className="text-2xl font-bold text-orange-600">35</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Lịch hẹn</h2>
          <p className="text-2xl font-bold text-orange-600">58</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Doanh thu</h2>
          <p className="text-2xl font-bold text-orange-600">12,500,000 VNĐ</p>
        </div>
      </div>

      {/* Bảng dữ liệu mẫu */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Lịch hẹn gần đây</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Khách hàng</th>
              <th className="p-3">Dịch vụ</th>
              <th className="p-3">Ngày</th>
              <th className="p-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3">Nguyễn Văn A</td>
              <td className="p-3">Cắt tóc nam</td>
              <td className="p-3">10/12/2025</td>
              <td className="p-3 text-green-600 font-semibold">Hoàn thành</td>
            </tr>
            <tr className="border-b">
              <td className="p-3">Trần Thị B</td>
              <td className="p-3">Nhuộm tóc</td>
              <td className="p-3">09/12/2025</td>
              <td className="p-3 text-orange-600 font-semibold">Đang chờ</td>
            </tr>
            <tr>
              <td className="p-3">Lê Văn C</td>
              <td className="p-3">Gội đầu</td>
              <td className="p-3">08/12/2025</td>
              <td className="p-3 text-red-500 font-semibold">Hủy</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;