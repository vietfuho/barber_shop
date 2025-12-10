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
                  // <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md text-sm z-10">
                  //   <NavLink to="/profile" className="block px-4 py-2 hover:bg-orange-50">Profile </NavLink>
                  //   <NavLink to="/profile" className="block px-4 py-2 hover:bg-orange-50">Setting</NavLink>
                  //   <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-orange-50">
                  //     <Link to="/login">Đăng xuất</Link>
                  //   </button>
                  // </div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 overflow-hidden">
                    {/* Profile */}
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium">Hồ sơ</span>
                    </NavLink>

                    {/* Settings */}
                    <NavLink
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 0M10.325 19.683c.426 1.756 2.924 1.756 3.35 0a1.724 1.724 0 002.573-1.066c1.543.94 3.31-.826 2.37 0M12 8a4 4 0 100 8 4 4 0 000-8z" />
                      </svg>
                      <span className="font-medium">Cài đặt</span>
                    </NavLink>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-1"></div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0-4-4m0 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Đăng xuất
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