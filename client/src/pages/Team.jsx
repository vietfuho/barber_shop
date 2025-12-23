import React, { useEffect, useState } from "react";
import axios from "axios";
import defautAva from "../assets/image/defautAva.png";

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
    <section className="py-24 px-4
      bg-gradient-to-b from-orange-50 via-amber-50 to-white">
      
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-3">
          Đội ngũ của chúng tôi
        </h2>
        <p className="text-center text-gray-600 mb-14">
          Những người thợ chuyên nghiệp – tận tâm – giàu kinh nghiệm
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
        ) : team.length === 0 ? (
          <p className="text-center text-gray-500">
            Chưa có nhân viên nào.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {team.map((member) => (
              <div
                key={member._id}
                className="bg-white rounded-2xl p-8 text-center
                  border border-orange-100
                  shadow-md hover:shadow-xl
                  hover:-translate-y-1 transition-all duration-300"
              >
                {/* Avatar */}
                <div className="relative w-32 h-32 mx-auto mb-5">
                  <img
                    src={member.avatar || defautAva}
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover
                      border-4 border-orange-400
                      shadow-sm"
                  />
                  {/* Role badge */}
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2
                    px-4 py-1 bg-orange-500 text-white
                    text-xs font-semibold rounded-full shadow">
                    {member.role?.toUpperCase() || "STAFF"}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-semibold text-gray-800 mt-6">
                  {member.username || "Không có tên"}
                </h3>

                {/* Info */}
                <div className="mt-4 space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    {member.email || "Chưa cập nhật"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">SĐT:</span>{" "}
                    {member.phone || "Chưa cập nhật"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Chuyên môn:</span>{" "}
                    {member.specialty || "Chưa cập nhật"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Địa chỉ:</span>{" "}
                    {member.address || "Chưa cập nhật"}
                  </p>
                  
                  <p>
                    <span className="font-medium text-gray-700">Kinh nghiệm:</span>{" "}
                    {member.experience ?? 0} năm
                  </p>
                  
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
