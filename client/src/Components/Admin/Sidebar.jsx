  import React from "react";
  import { NavLink } from "react-router-dom";
  import { IoMdCut } from "react-icons/io";
  const Sidebar = () => {
    const menuItems = [
      { to: "/admin", label: "Dashboard" },
      { to: "/admin/users", label: "Người dùng" },
      { to: "/admin/services", label: "Dịch vụ" },
      { to: "/admin/bookings", label: "Lịch hẹn" },
      { to: "/admin/postSchedule", label: "Lịch làm việc" },
      { to: "/admin/aprove", label: "Phê duyệt yêu cầu" },
      
    ];

    return (
      <aside className="w-64 h-screen bg-[#1F1F1F] shadow-md flex flex-col">
        {/* Logo */}
        <div className="px-6 py-8 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white flex gap-2 justify-center items-center "> <IoMdCut className="text-orange-600" /> <h1 className="text-orange-600">Elite Admin</h1></h2>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 text-base">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition duration-200 ${
                  isActive
                    ? "bg-orange-600 text-white font-semibold shadow-md"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    );
  };

  export default Sidebar;