import { Routes, Route } from "react-router-dom";
import AdminServices from "../../pages/admin/AdminServices";
import AddServices from "../../pages/admin/AddServices";
import EditService from "../../pages/admin/EditServices";

const AdminFE = () => {
  return (
    <Routes>
      <Route path="/admin/services" element={<AdminServices />} />
      <Route path="/admin/services/add" element={<AddServices />} />
      <Route path="/admin/services/edit/:id" element={<EditService />} />
    </Routes>
  );
};

export default AdminFE;