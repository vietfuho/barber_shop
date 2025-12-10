import React from "react";
import { useNavigate } from "react-router-dom";

export default function DetailsServices() {
  const navigate = useNavigate();

  // Tạm thời mock dữ liệu để dựng giao diện
  const service = {
    name: "Cắt xả tạo kiểu",
    description: "Cắt tạo kiểu, xả sạch tóc con. Cạo mặt khai sáng ngũ quan",
    duration: 30,
    price: 94000,
    category: "Cắt tóc",
    imageUrl: "https://via.placeholder.com/600x400", // ảnh demo
    _id: "676abc123def4567890ghi",
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Ảnh dịch vụ */}
        <div className="md:w-1/2 w-full">
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>

        {/* Nội dung dịch vụ */}
        <div className="md:w-1/2 w-full p-6 flex flex-col">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">
            {service.name}
          </h1>
          <p className="text-gray-700 mb-4">{service.description}</p>

          {/* Thông tin chi tiết */}
          <div className="space-y-2 text-sm text-gray-600 mb-6">
            <p>
              <span className="font-medium text-gray-800">Thời gian:</span>{" "}
              {service.duration} Phút
            </p>
            <p>
              <span className="font-medium text-gray-800">Giá:</span>{" "}
              {service.price.toLocaleString()} VNĐ
            </p>
            <p>
              <span className="font-medium text-gray-800">Danh mục:</span>{" "}
              {service.category}
            </p>
            <p>
              <span className="font-medium text-gray-800">Mã dịch vụ:</span>{" "}
              {service._id}
            </p>
          </div>

          {/* Nút hành động */}
          <div className="flex gap-3 mt-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 text-center bg-white border border-orange-500 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition"
            >
              ← Quay lại
            </button>
            <button
              onClick={() => navigate("/booking")}
              className="flex-1 text-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Đặt ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}