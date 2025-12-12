import React, { useEffect, useState } from "react";
import axios from "axios";
import defautAva from "../assets/image/defautAva.png"
export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/users/team", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.staffs || [];

        setTeam(data);
      } catch (err) {
        console.log("Lỗi:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="bg-white py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-10">
        Gặp gỡ đội ngũ của chúng tôi
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Đang tải...</p>
      ) : team.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có nhân viên nào.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {team.map((member) => (
            <div
              key={member._id}
              className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl hover:-translate-y-1 transition"
            >
              <img
                src={defautAva}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-orange-500"
                alt=""
              />

              <h3 className="text-xl font-semibold text-gray-900 mt-4">
                {member.username || "Không có tên"}
              </h3>

              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Ngành nghề: </span>
                {member.specialty || "Chưa cập nhật"}
              </p>

              <p className="text-gray-600 mt-1">
                <span className="font-semibold">Kinh nghiệm: </span>
                {member.experience ?? 0} năm
              </p>

              <div className="mt-4">
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                  {member.role?.toUpperCase() || "STAFF"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
