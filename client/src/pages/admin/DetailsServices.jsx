import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DetailsServices = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/services/${id}`)
      .then((res) => setService(res.data))
      .catch((err) => console.error("Lỗi lấy dịch vụ:", err));
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg animate-pulse">Đang tải dịch vụ...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Ảnh dịch vụ */}
        <div className="md:w-1/2 w-full relative">
          <img
            src={
              service.imageUrl
                ? service.imageUrl
                : service.imageFile
                ? `http://localhost:5000/uploads/${service.imageFile}`
                : "https://via.placeholder.com/600x400"
            }
            alt={service.name || "Dịch vụ"}
            className="w-full h-80 md:h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          { !service.isActive && (
            <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Ngừng hoạt động
            </span>
          )}
        </div>

        {/* Nội dung dịch vụ */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-orange-600 mb-3">
              {service.name}
            </h1>
            <p className="text-gray-700 mb-6">{service.description}</p>

            <div className=" grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
              <div className="flex justify-between py-3">
                <span className="font-semibold">Thời gian:</span>
                <span>{service.duration || 0} phút</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-semibold">Giá:</span>
                <span className="text-orange-600 font-bold">
                  {(service.price || 0).toLocaleString()} VNĐ
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-semibold">Kiểu tóc:</span>
                <span>{service.styleOptions || "Không có"}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-semibold">Trạng thái:</span>
                <span className={service.isActive ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                  {service.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
                </span>
              </div>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 bg-white border border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition duration-300"
            >
              ← Quay lại
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsServices;
