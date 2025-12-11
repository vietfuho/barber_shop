import React, { useEffect, useState } from "react";
import axios from "axios";

// Import Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    bookings: 0,
    revenue: 0,
    recentBookings: [],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Lấy users
        const usersRes = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Lấy services
        const servicesRes = await axios.get("http://localhost:5000/api/services");

        // Lấy bookings
        const bookingsRes = await axios.get("http://localhost:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const usersCount = usersRes.data.length;
        const servicesCount = servicesRes.data.length;
        const bookingsCount = bookingsRes.data.length;

        // Tính doanh thu
        const revenue = bookingsRes.data
          .filter((b) => b.status === "paid")
          .reduce(
            (sum, b) =>
              sum +
              (b.serviceId?.price ? Number(b.serviceId.price) : Number(b.price) || 0),
            0
          );

        // Lấy 5 lịch hẹn mới nhất
        const recentBookings = bookingsRes.data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);

        setStats({
          users: usersCount,
          services: servicesCount,
          bookings: bookingsCount,
          revenue,
          recentBookings,
        });
      } catch (err) {
        console.error("Lỗi Dashboard:", err);
      }
    };

    fetchStats();
  }, [token]);

  // Dữ liệu biểu đồ
  const chartData = [
    { name: "Pending", value: stats.recentBookings.filter((b) => b.status === "pending").length },
    { name: "Paid", value: stats.recentBookings.filter((b) => b.status === "paid").length },
    { name: "Cancelled", value: stats.recentBookings.filter((b) => b.status === "cancelled").length },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-8">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Người dùng</h2>
          <p className="text-2xl font-bold text-orange-600">{stats.users}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Dịch vụ</h2>
          <p className="text-2xl font-bold text-orange-600">{stats.services}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Lịch hẹn</h2>
          <p className="text-2xl font-bold text-orange-600">{stats.bookings}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Doanh thu</h2>
          <p className="text-2xl font-bold text-orange-600">
            {stats.revenue.toLocaleString()} VNĐ
          </p>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="bg-white shadow-lg rounded-xl p-6 mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Biểu đồ trạng thái
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#fb923c" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
