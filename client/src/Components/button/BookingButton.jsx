import React from "react";
import { useNavigate } from "react-router-dom";

const BookingButton = ({ hasSelectedService = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("token");

    // ❌ Chưa đăng nhập
    if (!token) {
      const confirmLogin = window.confirm(
        "⚠️ Bạn cần đăng nhập trước khi đặt lịch. Nhấn OK để chuyển đến trang đăng nhập."
      );
      if (confirmLogin) navigate("/login");
      return;
    }

    // ❌ Chưa chọn dịch vụ
    if (!hasSelectedService) {
      const confirmService = window.confirm(
        "⚠️ Bạn cần chọn dịch vụ trước khi đặt lịch. Nhấn OK để chuyển đến trang dịch vụ."
      );
      if (confirmService) navigate("/services");
      return;
    }

    // ✅ Đủ điều kiện
    navigate("/booking");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-amber-600 text-white px-11 py-5 rounded-full text-base font-semibold transition"
    >
      Đặt lịch
    </button>
  );
};

export default BookingButton;
