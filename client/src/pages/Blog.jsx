import { useEffect, useState } from "react";
import axios from "axios";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Tiêu đề trang */}
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          📰 Tin tức & Blog
        </h1>

        {/* Mô tả ngắn */}
        <p className="text-center text-gray-600 mb-10">
          Cập nhật xu hướng tóc nam, mẹo chăm sóc tóc và phong cách thời thượng từ Elite Barber.
        </p>

        {/* Danh sách bài viết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
              <img
                src={post.imageUrl || `http://localhost:5000/uploads/${post.imageFile}`}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
                <button className="text-orange-600 font-medium hover:underline">
                  Đọc thêm →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}