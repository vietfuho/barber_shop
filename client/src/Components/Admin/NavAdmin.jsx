import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import axios from "axios";

const NavAdmin = () => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.role === "admin") {
          setAdminName(res.data.username);
        }
      })
      .catch((err) => console.error("Lỗi lấy profile:", err));
  }, []);

  return (
    <header className="h-24 bg-[#1F1F1F] shadow-sm px-6 flex items-center justify-end">
  <Link
    to="/admin/profileAdmin"
    className="flex items-center gap-2 text-white cursor-pointer hover:text-orange-400 mr-8"
  >
    <CgProfile size={40} />
    <span className="font-bold">{adminName || "Admin"}</span>
  </Link>
</header>
  );
};

export default NavAdmin;