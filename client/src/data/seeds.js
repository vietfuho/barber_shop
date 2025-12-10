import cattoc from "../assets/image/cattoc.png";
import uontoc from "../assets/image/uontoc.png";
import nhuomtoc from "../assets/image/nhuomtoc.png";
import caorauvaspa from "../assets/image/caorauvaspa.png";

export const services = [
  {
    id: 1,
    title: "Cắt tóc & Tạo kiểu",
    priceMin: 150000,
    priceMax: 300000,
    priceLabel: "150.000đ - 300.000đ",
    image: cattoc,
    features: [
      "Tư vấn miễn phí",
      "Cắt tóc chuyên nghiệp",
      "Gội massage",
      "Tạo kiểu theo yêu cầu",
    ],
    category: "haircut",
  },
  {
    id: 2,
    title: "Uốn & Duỗi tóc",
    priceMin: 500000,
    priceMax: 800000,
    priceLabel: "500.000đ - 800.000đ",
    image: uontoc,
    features: [
      "Công nghệ Hàn Quốc",
      "Thuốc cao cấp không hại",
      "Bảo hành 30 ngày",
      "Chăm sóc sau uốn",
    ],
    category: "perm",
  },
  {
    id: 3,
    title: "Nhuộm & Highlight",
    priceMin: 400000,
    priceMax: 1200000,
    priceLabel: "400.000đ - 1.200.000đ",
    image: nhuomtoc,
    features: [
      "Thuốc nhuộm Ý/Nhật",
      "Màu bền 60 ngày",
      "Tư vấn tóc miễn phí",
      "Tư vấn màu phù hợp",
    ],
    category: "color",
  },
  {
    id: 4,
    title: "Cạo râu và spa",
    priceMin: 400000,
    priceMax: 1200000,
    priceLabel: "400.000đ - 1.200.000đ",
    image: caorauvaspa,
    features: [
      "Cạo râu và spa Ý/Nhật",
      "Sạch sẽ",
      "Tư vấn miễn phí",
      "Tư vấn phù hợp",
    ],
    category: "spa",
  },
];