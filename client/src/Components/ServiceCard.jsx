import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const fetchedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Lỗi lấy dịch vụ:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!fetchedRef.current) {
      fetchedRef.current = true;
      fetchServices();
    }
  }, []);

  if (loading) return <div className="p-10 text-xl">Đang tải dịch vụ...</div>;
  if (services.length === 0)
    return (
      <div className="p-10 text-xl text-red-500">
        Không có dịch vụ nào
      </div>
    );

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {services.map((service) => {
          const imageSrc = service.imageUrl
            ? service.imageUrl.startsWith("http")
              ? service.imageUrl
              : `http://localhost:5000/${service.imageUrl}`
            : service.imageFile
            ? `http://localhost:5000/uploads/${service.imageFile}`
            : null;

          return (
            <div
              key={service._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col h-full overflow-hidden"
            >
              {/* Ảnh */}
              <div className="w-full h-52 bg-gray-200 flex-shrink-0">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback-image.jpg";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Không có ảnh
                  </div>
                )}
              </div>

              {/* Nội dung */}
              <div className="p-4 flex flex-col flex-1">
                {/* Tên */}
                <h2 className="text-lg font-bold text-gray-800 min-h-[28px]">
                  {service.name || " "}
                </h2>

                {/* Mô tả */}
                <div className="mt-2 min-h-[48px]">
                  {service.description ? (
                    <p
                      className={`text-gray-600 ${
                        expanded[service._id] ? "" : "line-clamp-2"
                      }`}
                    >
                      {service.description}
                    </p>
                  ) : (
                    <p className="invisible">placeholder</p>
                  )}
                </div>

                {service.description?.length > 60 && (
                  <button
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [service._id]: !prev[service._id],
                      }))
                    }
                    className="text-sm text-blue-500 mt-1 hover:underline self-start"
                  >
                    {expanded[service._id] ? "Ẩn bớt" : "Xem thêm"}
                  </button>
                )}

                {/* Kiểu tóc */}
                <div className="mt-2 min-h-[20px]">
                  {service.styleOptions ? (
                    <p className="text-sm text-gray-500">
                      Kiểu tóc: {service.styleOptions}
                    </p>
                  ) : (
                    <p className="invisible">placeholder</p>
                  )}
                </div>

                {/* Màu nhuộm */}
                <div className="mt-2 min-h-[56px]">
                  {service.colorOptions?.length > 0 ? (
                    <>
                      <p className="text-sm text-gray-500 mb-1">
                        Màu nhuộm:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.colorOptions.map((color, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-md text-sm font-medium text-white"
                            style={{
                              backgroundColor: color.swatch || "#999",
                            }}
                          >
                            {color.label}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="invisible">placeholder</div>
                  )}
                </div>

                {/* Giá + thời gian */}
                <div className="mt-3 min-h-[40px]">
                  <p className="font-semibold text-orange-600">
                    Giá:{" "}
                    {service.price
                      ? service.price.toLocaleString()
                      : "—"}{" "}
                    VNĐ
                  </p>
                  <p className="text-sm text-gray-500">
                    Thời gian: {service.duration || "—"} phút
                  </p>
                </div>

                {/* Nút hành động */}
                <div className="mt-auto pt-4 flex justify-between items-center">
                  <button
                    onClick={() =>
                      navigate(`/services/details/${service._id}`)
                    }
                    className="text-gray-500 hover:text-gray-700 transition font-medium"
                  >
                    Xem chi tiết →
                  </button>

                  <button
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        const confirmLogin = window.confirm(
                          "⚠️ Bạn cần đăng nhập trước khi đặt lịch. Bạn có muốn đăng nhập ngay?"
                        );
                        if (confirmLogin) navigate("/login");
                        return;
                      }
                      navigate("/booking", { state: { service } });
                    }}
                    className="bg-orange-600 hover:bg-amber-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition"
                  >
                    Đặt lịch
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceCard;
