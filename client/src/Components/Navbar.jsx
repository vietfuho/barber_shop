// src/Components/Navbar.jsx
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdCut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { LuCalendarClock } from "react-icons/lu";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <header className="bg-[#171717] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center font-bold text-[24px]">
              <IoMdCut className="text-orange-400" />
              <span className="ml-2 text-orange-400">Elite Barber</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-[16px]">
            <NavLink to="/" end className={({ isActive }) => isActive ? "text-orange-500" : "text-white hover:text-orange-500"}>Trang chủ</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-orange-500" : "text-white hover:text-orange-500"}>Về chúng tôi</NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? "text-orange-500" : "text-white hover:text-orange-500"}>Dịch vụ</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => isActive ? "text-orange-500" : "text-white hover:text-orange-500"}>Thư viện</NavLink>
            <NavLink to="/team" className={({ isActive }) => isActive ? "text-orange-500" : "text-white hover:text-orange-500"}>Đội ngũ</NavLink>
            <NavLink to="/registerStaff" className={({ isActive }) => isActive ? "text-orange-500" : "text-white hover:text-orange-500"}>Trở thành thợ</NavLink>
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4 text-[16px]">
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className={({ isActive }) => isActive ? "text-orange-500" : "text-gray-300 hover:text-orange-500"}>Đăng nhập</NavLink>
                <NavLink to="/register" className={({ isActive }) => isActive ? "bg-orange-600 text-white px-4 py-2 rounded" : "bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"}>Đăng ký</NavLink>
              </>
            ) : (
              <div className="relative flex items-center space-x-4 group">
                <Link to="/mybookings">
                  <LuCalendarClock size={28} className="text-orange-500" />
                </Link>
                <CgProfile size={28} className="text-orange-500 cursor-pointer" />
                <div className="hidden group-hover:block absolute right-0 top-full mt-2 w-48 bg-[#171717] rounded-lg shadow-lg border border-gray-700 py-2 z-50 before:content-[''] before:absolute before:-top-2 before:right-6 before:border-8 before:border-transparent before:border-b-[#171717]">
                  <NavLink to="/profile" className="flex items-center gap-3 px-4 py-3 text-white hover:bg-orange-500 transition-colors">Hồ sơ</NavLink>
                  <NavLink to="/settings" className="flex items-center gap-3 px-4 py-3 text-white hover:bg-orange-500 transition-colors">Cài đặt</NavLink>
                  <div className="border-t border-gray-600 my-1"></div>
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-600 hover:text-white transition-colors font-medium">Đăng xuất</button>
                   <NavLink to="/resetPass" className="flex items-center gap-3 px-4 py-3 text-white hover:bg-orange-500 transition-colors">Đổi mật khẩu </NavLink>
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;