import React from 'react'
import BookingButton from '../Components/button/BookingButton';
const Premium = () => {
  return (
    <div>
        {/* Gói dịch vụ combo */}
      <section className="bg-gray-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-orange-600 mb-4">
            Gói dịch vụ combo
          </h2>
          <p className="text-gray-700 text-lg">
            Lựa chọn gói phù hợp với nhu cầu của bạn
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Gói Cơ Bản */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold text-orange-500 mb-2">Cơ Bản</h3>
            <p className="text-xl font-semibold text-gray-800 mb-4">150.000₫</p>
            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              <li>Cắt tóc nam cơ bản</li>
              <li>Gội đầu thường</li>
              <li>Tạo kiểu đơn giản</li>
              <li>Tư vấn kiểu tóc</li>
            </ul>
            <BookingButton />
          </div>

          {/* Gói Premium */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border-2 border-orange-500 transform transition duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold text-orange-500 mb-2">
              Premium{" "}
              <span className="text-sm text-orange-400">(Phổ biến nhất)</span>
            </h3>
            <p className="text-xl font-semibold text-gray-800 mb-4">300.000₫</p>
            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              <li>Cắt tóc thiết kế</li>
              <li>Gội massage chuyên sâu</li>
              <li>Cạo mặt & chăm sóc da</li>
              <li>Đồ uống cao cấp</li>
              <li>Không gian VIP</li>
            </ul>
            <BookingButton />
          </div>

          {/* Gói Platinum */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold text-orange-500 mb-2">
              Platinum
            </h3>
            <p className="text-xl font-semibold text-gray-800 mb-4">500.000₫</p>
            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              <li>Phòng riêng VIP</li>
              <li>Massage toàn thân 20 phút</li>
              <li>Chăm sóc da chuyên sâu</li>
              <li>Tạo kiểu phức tạp</li>
              <li>Tích điểm thành viên</li>
            </ul>
            <BookingButton />
          </div>
        </div>
      </section>
      </div>
  )
}

export default Premium