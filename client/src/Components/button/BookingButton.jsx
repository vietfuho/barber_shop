// src/components/BookingButton.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function BookingButton() {
  return (
    <Link
              to="/booking"
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full text-base font-semibold transition"
            >
              Đặt lịch ngay
              <FaArrowRight className="text-white text-lg" />
            </Link>
  );
}