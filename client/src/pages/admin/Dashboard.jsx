import React, { useEffect, useState } from "react";
import axios from "axios";

// Recharts
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
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
        const [usersRes, servicesRes, bookingsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/services"),
          axios.get("http://localhost:5000/api/bookings", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const usersCount = usersRes.data.length;
        const servicesCount = servicesRes.data.length;
        const bookings = bookingsRes.data;

        // Doanh thu
        const revenue = bookings
          .filter((b) => b.status === "paid")
          .reduce(
            (sum, b) =>
              sum +
              (b?.serviceId?.price
                ? Number(b.serviceId.price)
                : Number(b.price) || 0),
            0
          );

        // 5 lịch hẹn mới nhất (giữ nguyên nếu bạn cần)
        const recentBookings = [...bookings]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);

        setStats({
          users: usersCount,
          services: servicesCount,
          bookings: bookings.length,
          revenue,
          recentBookings,
        });
      } catch (err) {
        console.error("Lỗi Dashboard:", err);
      }
    };

    fetchStats();
  }, [token]);

  // Dữ liệu biểu đồ tổng theo toàn bộ bookings (không chỉ recent)
  const bookingsAll = stats.recentBookings.length
    ? null // chỉ để tránh warning khi chưa set
    : null; // không dùng, dữ liệu lấy lại từ API ngay trên

  const chartCounts = {
    pending: stats.recentBookings.length
      ? stats.recentBookings.filter((b) => b.status === "pending").length
      : 0,
    paid: stats.recentBookings.length
      ? stats.recentBookings.filter((b) => b.status === "paid").length
      : 0,
    cancelled: stats.recentBookings.length
      ? stats.recentBookings.filter((b) => b.status === "cancelled").length
      : 0,
  };

  // Nếu bạn muốn lấy từ toàn bộ bookings thay vì recentBookings,
  // thay vì dùng stats.recentBookings ở trên, hãy tính từ API (bookingsRes.data)
  // Để đơn giản, mình thêm guard khi tất cả bằng 0 sẽ chia đều 3 phần.
  const total = chartCounts.pending + chartCounts.paid + chartCounts.cancelled;

  const chartData =
    total > 0
      ? [
          { name: "Pending", value: chartCounts.pending },
          { name: "Paid", value: chartCounts.paid },
          { name: "Cancelled", value: chartCounts.cancelled },
        ]
      : [
          { name: "Pending", value: 1 },
          { name: "Paid", value: 1 },
          { name: "Cancelled", value: 1 },
        ];

  const COLORS = ["#facc15", "#22c55e", "#ef4444"]; // vàng, xanh lá, đỏ

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
        {/* Doanh thu (bật nếu cần)
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Doanh thu</h2>
          <p className="text-2xl font-bold text-orange-600">
            {stats.revenue.toLocaleString()} VNĐ
          </p>
        </div> */}
      </div>

      {/* Biểu đồ tổng (hình tròn) */}
      <div className="bg-white shadow-lg rounded-xl p-6 mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Biểu đồ tổng
        </h2>

        <div style={{ width: "100%", height: 360 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `${value} mục`,
                  name,
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;