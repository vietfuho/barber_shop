import React from "react";
import { Link } from "react-router-dom";
import bannerservices from "../assets/image/bannerservices.png";
import HeroOther from "../Components/HeroOther";

import ServiceCard from "../Components/ServiceCard";
import BookingButton from "../Components/button/BookingButton";
import Premium from "../Components/Premium";

const ServicesPrice = () => {
  return (
    <main className="bg-white text-neutral-800">
      {/* Hero Section */}
      <HeroOther
        title="Dịch vụ chuyên nghiệp"
        subtitle="Đa dạng dịch vụ với tiêu chuẩn quốc tế"
        image={bannerservices}
      />

      {/* Danh sách dịch vụ */}
      <section className="py-16 px-4 max-w-6xl mx-auto grid gap-10">
          <ServiceCard />
      </section>
      <Premium/>
    </main>
  );
};

export default ServicesPrice;
