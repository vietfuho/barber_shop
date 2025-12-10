import React from "react";
import { IoMdCut } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-[#171717] text-white pt-10 pb-6 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cột 1: Logo + mô tả */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <IoMdCut className="text-orange-400 text-2xl" />
            <span className="text-xl font-bold">Elite Barber</span>
          </div>
          <p className="text-sm text-gray-300">
            Mang đến cho bạn trải nghiệm cắt tóc đẳng cấp với đội ngũ thợ chuyên
            nghiệp và không gian hiện đại, sang trọng.
          </p>
          <div className="flex space-x-4 mt-4">
            {/* Facebook */}
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
            >
              <FaFacebook className="text-white text-2xl" />
            </Link>

            {/* Instagram */}
            <Link
              to="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
            >
              <FaInstagram className="text-white text-2xl" />
            </Link>
          </div>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-500">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-orange-500">
                Dịch vụ
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-orange-500">
                Bảng giá
              </Link>
            </li>
            <li>
              <Link to="/booking" className="hover:text-orange-500">
                Đặt lịch
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>📍 123 VIET, TP DANANG</li>
            <li>📞 090 568 5943 </li>
            <li>📧 vietpp1992@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
        © 2025 Elite Barber. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
