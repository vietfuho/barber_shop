import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdCut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOpenMenu(false);
  };

  return (
    <header className="bg-[#171717] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center font-bold text-gray-800 text-[24px]">
              <IoMdCut className="text-orange-400" />
              <span className="ml-2 text-white">Elite Barber</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-[16px]">
            <NavLink to="/" end className={({ isActive }) => isActive ? "text-orange-500" : "text-white hover:text-orange-500"}>Trang chủ</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-orange-500" : "text-white hover:text-orange-500"}>Về chúng tôi</NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? "text-orange-500" : "text-white hover:text-orange-500"}>Dịch vụ</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => isActive ? "text-orange-500" : "text-white hover:text-orange-500"}>Thư viện</NavLink>
            <NavLink to="/team" className={({ isActive }) => isActive ? "text-orange-500" : "text-white hover:text-orange-500"}>Đội ngũ</NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? "text-orange-500" : "text-white hover:text-orange-500"}>Tin tức</NavLink>
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4 text-[16px]">
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className={({ isActive }) => isActive ? "text-orange-500" : "text-gray-300 hover:text-orange-500"}>Đăng nhập</NavLink>
                <NavLink to="/register" className={({ isActive }) => isActive ? "bg-orange-600 text-white px-4 py-2 rounded" : "bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"}>Đăng ký</NavLink>
              </>
            ) : (
              <div className="relative">
                <button onClick={() => setOpenMenu(!openMenu)}>
                  <CgProfile size={28} className="text-orange-500" />
                </button>
                {openMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md text-sm z-10">
                    <NavLink to="/profile" className="block px-4 py-2 hover:bg-orange-50">Profile </NavLink>
                    <NavLink to="/profile" className="block px-4 py-2 hover:bg-orange-50">Setting</NavLink>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-orange-50">
                      <Link to="/login">Đăng xuất</Link>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;