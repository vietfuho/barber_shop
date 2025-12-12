import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminServices from "../../pages/admin/AdminServices";
import AddServices from "../../pages/admin/AddServices";
import EditService from "../../pages/admin/EditServices";
import DetailsServices from "../../pages/admin/DetailsServices";
import NavAdmin from "../../Components/Admin/NavAdmin";
import Sidebar from "../../Components/Admin/Sidebar";
import Dashboard from "../../pages/admin/Dashboard";
import UserMana from "../../pages/admin/UserMana";
import AppoinManager from "../../pages/admin/ApppoinManager";
import Aprove from "../../pages/admin/Aprove";

const AdminFE = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar trái */}
      <Sidebar />
      
      {/* Nội dung phải */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Navbar trên cùng */}
        <NavAdmin />

        {/* Nội dung động */}
        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="services/add" element={<AddServices />} />
            <Route path="services/details/:id" element={<DetailsServices />} />
            <Route path="services/edit/:id" element={<EditService />} />
            <Route path="users" element={<UserMana />} />
            <Route path="bookings" element={<AppoinManager />} />
            <Route path="bookings" element={<Aprove />} />
            
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminFE;