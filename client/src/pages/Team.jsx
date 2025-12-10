import React from "react";
import HeroOther from "../Components/HeroOther";
import blackBanner from "../assets/image/blackBanner.png";
import BaberCard from "../Components/BarberCard.jsx";
import { teamMembers } from "../data/team.js";

const Team = () => {
  return (
    <div className="bg-white text-neutral-800">
      <HeroOther
        className="bg-black"
        title="Đội ngũ chuyên nghiệp"
        subtitle="Hơn 10 năm định hình phong cách nam giới Việt"
        image={blackBanner}
      />

      {/* Thống kê đội ngũ */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-10">
          Thành tựu nổi bật
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><div className="text-4xl text-orange-500 mb-2">✂ 15+</div><p className="text-gray-700">Thợ chuyên nghiệp</p></div>
          <div><div className="text-4xl text-orange-500 mb-2">🏅 20+</div><p className="text-gray-700">Chứng chỉ quốc tế</p></div>
          <div><div className="text-4xl text-orange-500 mb-2">⭐ 5000+</div><p className="text-gray-700">Khách hài lòng</p></div>
          <div><div className="text-4xl text-orange-500 mb-2">👤 10+</div><p className="text-gray-700">Năm kinh nghiệm</p></div>
        </div>
      </section>

      {/* Gặp gỡ đội ngũ */}
      <section className="py-16 px-4 bg-gray-100 max-w-full mx-auto">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-10">
          Gặp gỡ đội ngũ của chúng tôi
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Đội ngũ thợ giàu kinh nghiệm, được đào tạo bài bản với chứng chỉ quốc tế
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <BaberCard key={index} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;