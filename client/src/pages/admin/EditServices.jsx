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
    category: "",
    imageUrl: "",
    imageFile: null,
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/services/${id}`).then((res) => {
      setFormData({
        ...formData,
        name: res.data.name,
        description: res.data.description,
        price: res.data.price,
        duration: res.data.duration,
        category: res.data.category,
        imageUrl: res.data.imageUrl || "",
      });
    });
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "imageFile") {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          if (key === "imageFile") {
            data.append("image", formData.imageFile);
          } else {
            data.append(key, formData[key]);
          }
        }
      });

      await axios.put(`http://localhost:5000/api/services/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Cập nhật dịch vụ thành công!");
      navigate("/admin/services");
    } catch (err) {
      console.log(err);
      alert("Lỗi khi cập nhật dịch vụ");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          ✏️ Sửa dịch vụ
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên dịch vụ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên dịch vụ
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded text-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập tên dịch vụ"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded text-sm focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Nhập mô tả dịch vụ"
            />
          </div>

          {/* Giá + Thời gian */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá (VNĐ)
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded text-sm focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập giá"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thời gian (phút)
              </label>
              <input
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded text-sm focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập thời gian"
              />
            </div>
          </div>

          {/* Danh mục */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Danh mục
            </label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded text-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập danh mục"
            />
          </div>

          {/* Link ảnh */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link ảnh (tùy chọn)
            </label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded text-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập link ảnh"
            />
          </div>

          {/* Upload ảnh */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload ảnh mới
            </label>
            <input
              name="imageFile"
              type="file"
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded text-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Nút submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200 text-sm font-medium"
          >
            💾 Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );
}