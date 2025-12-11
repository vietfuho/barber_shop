import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditService() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    styleOptions: "",
    colorOptions: [{ label: "", swatch: "" }],
    imageUrl: "",
    imageFile: null,
    isActive: true,
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Lấy dữ liệu dịch vụ theo id
  useEffect(() => {
    axios.get(`http://localhost:5000/api/services/${id}`).then((res) => {
      const data = res.data;
      setFormData({
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        duration: data.duration || "",
        styleOptions: data.styleOptions || "",
        colorOptions: data.colorOptions?.length
          ? data.colorOptions
          : [{ label: "", swatch: "" }],
        imageUrl: data.imageUrl || "",
        imageFile: null,
        isActive: data.isActive ?? true,
      });
    });
  }, [id]);

  // Xử lý input thay đổi
  const handleChange = (e) => {
    if (e.target.name === "imageFile") {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Xử lý thay đổi màu nhuộm
  const handleColorChange = (index, field, value) => {
    const updated = [...formData.colorOptions];
    updated[index][field] = value;
    setFormData({ ...formData, colorOptions: updated });
  };

  // Thêm màu nhuộm mới
  const addColorOption = () => {
    setFormData({
      ...formData,
      colorOptions: [...formData.colorOptions, { label: "", swatch: "" }],
    });
  };

  // Submit form
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("duration", formData.duration);
    data.append("styleOptions", formData.styleOptions);
    data.append("colorOptions", JSON.stringify(formData.colorOptions));
    data.append("imageUrl", formData.imageUrl);
    data.append("isActive", formData.isActive);

    if (formData.imageFile) {
      data.append("image", formData.imageFile);
    }

    // Debug: xem FE gửi gì
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    await axios.put(`http://localhost:5000/api/services/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Cập nhật dịch vụ thành công!");
    navigate("/admin/services");
  } catch (err) {
    console.error("Lỗi FE khi PUT:", err);
    alert("Lỗi khi cập nhật dịch vụ");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-10 space-y-6"
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          ✏️ Sửa dịch vụ
        </h2>

        {/* Tên dịch vụ */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tên dịch vụ</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập tên dịch vụ"
            className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Kiểu tóc */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Kiểu tóc</label>
          <input
            name="styleOptions"
            value={formData.styleOptions}
            onChange={handleChange}
            placeholder="Ví dụ: Undercut"
            className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Màu nhuộm */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Màu nhuộm</label>
          {formData.colorOptions.map((opt, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Tên màu"
                value={opt.label}
                onChange={(e) => handleColorChange(idx, "label", e.target.value)}
                className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Mã màu (#hex) hoặc link ảnh"
                value={opt.swatch}
                onChange={(e) => handleColorChange(idx, "swatch", e.target.value)}
                className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-400"
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
          <label className="block text-gray-700 font-medium mb-2">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Nhập mô tả dịch vụ"
            rows="4"
            className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-400"
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
            placeholder="Nhập giá"
            className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-400"
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
            placeholder="Nhập thời gian"
            className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Link ảnh */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Link ảnh (tùy chọn)</label>
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Nhập link ảnh"
            className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Upload ảnh */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload ảnh mới</label>
          <input
            name="imageFile"
            type="file"
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-400"
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
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200 text-base font-semibold"
          >
            💾 Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}