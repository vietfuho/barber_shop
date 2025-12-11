import React, { useState } from "react";
import HeroOther from "../Components/HeroOther";
import bannerGallary from "../assets/image/bannerGallary.png";
import { galleryItems } from "../data/GallarySeeds";

const categories = ["Tất cả", "Cắt tóc", "Uốn tóc", "Nhuộm tóc", "Cạo râu", "Không gian", "Dụng cụ"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const filteredItems =
    selectedCategory === "Tất cả"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-white text-neutral-800">
      <HeroOther title="Thư viện ảnh" subtitle="Những tác phẩm tiêu biểu của chúng tôi" image={bannerGallary} />
      <section className="py-1 px-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${ 
                selectedCategory === cat ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-orange-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={item.image} alt={item.category} className="w-full h-64 object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;