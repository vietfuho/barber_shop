import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { services } from "../data/seeds"; // dữ liệu mẫu
import BookingButton from "./button/BookingButton";

export default function FeaturedServices() {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    const confirmService = window.confirm(
      "⚠️ Bạn cần chọn dịch vụ trước khi đặt lịch. Nhấn OK để chuyển đến trang dịch vụ."
    );
    if (confirmService) {
      navigate("/services");
    }
  };

  return (
    <section className="bg-white mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">Dịch vụ nổi bật</h2>
          <p className="text-neutral-600">Các dịch vụ được yêu thích nhất</p>
        </div>

        {/* Grid dịch vụ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-xl shadow-md"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300 bg-gray-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl text-white mb-2">{service.title}</h3>
                <p className="text-amber-500 text-xl">{service.priceLabel}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Nút xem tất cả */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-full transition-colors font-semibold"
          >
            Xem tất cả dịch vụ
          </Link>
        </div>
      </div>

      {/* Banner CTA */}
      <section className="mt-20 bg-black text-white py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sẵn sàng thay đổi diện mạo?
        </h2>
        <p className="text-lg text-neutral-300 mb-6">
          Đặt lịch ngay hôm nay để trải nghiệm dịch vụ đẳng cấp
        </p>

        <div className="flex justify-center" onClick={handleBookingClick}>
          <BookingButton />
        </div>
      </section>
    </section>
  );
}