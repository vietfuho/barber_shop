import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <div className="bg-orange-50 rounded-xl shadow-md overflow-hidden flex flex-col">
      {/* Ảnh dịch vụ */}
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-56 object-cover rounded-t-xl shadow-md hover:shadow-xl transition-shadow duration-300"

      
      />

      {/* Nội dung */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-orange-600 mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-gray-700 mb-4">
          Giá: <span className="font-semibold">{service.priceLabel}</span>
        </p>

        <ul className="space-y-2 mb-6 flex-1">
          {service.features?.map((feature, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <AiOutlineCheck className="text-orange-500" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Nút hành động */}
        <div className="flex gap-3 mt-auto">
         <Link
  to={`/services/details/${service._id}`}
  className="flex-1 text-center bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-100 transition"
>
  Xem chi tiết
</Link>
        </div>
      </div>
    </div>
  );
}