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
    styleOptions: "",
    colorOptions: [{ label: "", swatch: "" }],
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
      data.append("styleOptions", formData.styleOptions);
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
    <div className="min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="h-full w-full p-10 space-y-6"
      >
        <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          Thêm dịch vụ mới
        </h2>

        {/* Tên dịch vụ */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tên dịch vụ</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập tên dịch vụ"
            className="border px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Kiểu tóc */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Kiểu tóc</label>
          <input
            name="styleOptions"
            value={formData.styleOptions}
            onChange={handleChange}
            placeholder="Nhập kiểu tóc"
            className="border px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Màu nhuộm */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Màu nhuộm</label>
          {formData.colorOptions.map((opt, idx) => (
            <div key={idx} className="space-y-2 mb-3">
              <input
                type="text"
                placeholder="Tên màu"
                value={opt.label}
                onChange={(e) => handleColorChange(idx, "label", e.target.value)}
                className="border px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                placeholder="Mã màu (#hex) hoặc link ảnh"
                value={opt.swatch}
                onChange={(e) => handleColorChange(idx, "swatch", e.target.value)}
                className="border px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addColorOption}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm"
          >
            + Thêm màu nhuộm
          </button>
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Nhập mô tả"
            rows="4"
            className="border px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Giá */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Giá (VNĐ)</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Giá"
            className="border px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Thời gian */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Thời gian (phút)</label>
          <input
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Phút"
            className="border px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Link ảnh */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Link ảnh (tùy chọn)</label>
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Link ảnh"
            className="border px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Upload ảnh */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload ảnh</label>
          <input
            name="imageFile"
            type="file"
            onChange={handleChange}
            className="border px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Trạng thái */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="mr-2"
          />
          <label className="text-gray-700 font-medium">Kích hoạt dịch vụ</label>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button 
            type="submit"
            className="w-[300px] rounded-3xl text-center bg-orange-500 text-white py-3 shadow hover:bg-orange-600 transition duration-200 text-base font-semibold"
          >
            Thêm dịch vụ
          </button>
        </div>
      </form>
    </div>
  );
}