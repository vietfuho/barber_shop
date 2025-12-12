import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col, Tag } from "antd";
import BookingButton from "./button/BookingButton";

const { Meta } = Card;

const ServiceCard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

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
    return <div className="p-10 text-xl text-red-500">Không có dịch vụ nào</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[24, 24]}>
        {services.map((service) => {
          const imageSrc = (() => {
            if (service.imageUrl) {
              return service.imageUrl.startsWith("http")
                ? service.imageUrl
                : `http://localhost:5000/${service.imageUrl}`;
            }
            if (service.imageFile) {
              return `http://localhost:5000/uploads/${service.imageFile}`;
            }
            return null;
          })();

          return (
            <Col span={8} key={service._id}>
              <Card
                hoverable
                cover={
                  imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={service.name}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px 8px 0 0",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fallback-image.jpg"; // ảnh mặc định nếu lỗi
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "200px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "8px 8px 0 0",
                        color: "#888",
                      }}
                    >
                      Không có ảnh
                    </div>
                  )
                }
              >
                <Meta
                  title={service.name}
                  description={
                    <div>
                      <p style={{ marginTop: 10 }}>{service.description}</p>

                      {service.styleOptions && (
                        <p style={{ marginTop: 8, fontSize: 13, color: "#555" }}>
                          Kiểu tóc: {service.styleOptions}
                        </p>
                      )}

                      {service.colorOptions?.length > 0 && (
                        <div style={{ marginTop: 10 }}>
                          <p style={{ fontSize: 13, marginBottom: 5 }}>
                            Màu nhuộm:
                          </p>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {service.colorOptions.map((color, idx) => (
                              <Tag
                                key={idx}
                                color={color.swatch || "gray"}
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "5px",
                                }}
                              >
                                {color.label}
                              </Tag>
                            ))}
                          </div>
                        </div>
                      )}

                      <p
                        style={{
                          marginTop: 12,
                          fontWeight: "bold",
                          color: "orange",
                        }}
                      >
                        Giá: {service.price?.toLocaleString()} VNĐ
                      </p>

                      <p style={{ color: "#888", fontSize: 13 }}>
                        Thời gian: {service.duration} phút
                      </p>

                      <BookingButton />
                    </div>
                  }
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ServiceCard;