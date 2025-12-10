import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddServices() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    imageUrl: "",
    imageFile: null,
    isActive: true,
    styleOptions: "", // chỉ một chuỗi
    colorOptions: [{ label: "", swatch: "" }], // mảng object
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "imageFile") {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Màu nhuộm
  const handleColorChange = (index, field, value) => {
    const updated = [...formData.colorOptions];
    updated[index][field] = value;
    setFormData({ ...formData, colorOptions: updated });
  };

  const addColorOption = () => {
    setFormData({
      ...formData,
      colorOptions: [...formData.colorOptions, { label: "", swatch: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("duration", formData.duration);
      data.append("imageUrl", formData.imageUrl);
      data.append("isActive", formData.isActive);

      if (formData.imageFile) {
        data.append("image", formData.imageFile);
      }

      // styleOptions giờ chỉ là chuỗi
      data.append("styleOptions", formData.styleOptions);

      // colorOptions vẫn là mảng object
      data.append("colorOptions", JSON.stringify(formData.colorOptions));

      await axios.post("http://localhost:5000/api/services/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Thêm dịch vụ thành công!");
      navigate("/admin/services");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thêm dịch vụ");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-bold text-center text-orange-600 mb-4">
          Thêm dịch vụ mới
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Tên dịch vụ */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Tên dịch vụ</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên dịch vụ"
              className="border p-2 w-full rounded text-sm focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Kiểu tóc */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Kiểu tóc</label>
            <input
              name="styleOptions"
              value={formData.styleOptions}
              onChange={handleChange}
              placeholder="Nhập kiểu tóc"
              className="border p-2 w-full rounded text-sm focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Màu nhuộm */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Màu nhuộm</label>
            {formData.colorOptions.map((opt, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Tên màu"
                  value={opt.label}
                  onChange={(e) => handleColorChange(idx, "label", e.target.value)}
                  className="border p-2 w-full rounded text-sm focus:ring-2 focus:ring-orange-400"
                />
                <input
                  type="text"
                  placeholder="Mã màu (#hex) hoặc link ảnh"
                  value={opt.swatch}
                  onChange={(e) => handleColorChange(idx, "swatch", e.target.value)}
                  className="border p-2 w-full rounded text-sm focus:ring-2 focus:ring-orange-400"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addColorOption}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 text-sm"
            >
              + Thêm màu nhuộm
            </button>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Nhập mô tả"
              className="border p-2 w-full rounded text-sm focus:ring-2 focus:ring-orange-400"
              rows="3"
            />
          </div>

          {/* Giá + Thời gian */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Giá (VNĐ)</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Giá"
                className="border p-2 w-full rounded text-sm focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Thời gian (phút)</label>
              <input
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Phút"
                className="border p-2 w-full rounded text-sm focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Link ảnh */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Link ảnh (tùy chọn)</label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Link ảnh"
              className="border p-2 w-full rounded text-sm focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Upload ảnh */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Upload ảnh</label>
            <input
              name="imageFile"
              type="file"
              onChange={handleChange}
              className="border p-2 w-full rounded text-sm focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Trạng thái */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
            <label className="text-sm text-gray-700">Kích hoạt dịch vụ</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg shadow hover:bg-orange-600 transition duration-200 text-sm font-medium"
          >
            Thêm dịch vụ
          </button>
        </form>
      </div>
    </div>
  );
}